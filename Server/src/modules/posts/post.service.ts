import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../middlewares/auth";

// Create posts
const createPost = async (
  data: Omit<Post, "id" | "createAt" | "updateAt" | "authorId">,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });

  return result;
};

// Get all posts
const getAllPost = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string;
  tags: string[];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  // create an array where we keep the true value only
  const andConditions: PostWhereInput[] = [];

  // check the title, content and tag search are true or not if true then push it to the array
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({ isFeatured });
  }

  if (status) {
    andConditions.push({ status });
  }

  // check the multiple tags search are true or not if true then push it to the array
  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  if (authorId) {
    andConditions.push({ authorId });
  }

  const allPost = await prisma.post.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  // retrieve metadata from the database
  const total = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: allPost,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get single post
const getPostById = async (postId: string) => {
  const result = await prisma.$transaction(async (tranVariable) => {
    // update viewCount
    await tranVariable.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // Get the post data uniquely
    const postData = await tranVariable.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          where: {
            parentId: null,
          },
          orderBy: { createdAt: "desc" },
          include: {
            replies: {
              orderBy: { createdAt: "asc" },
              include: {
                replies: {
                  orderBy: { createdAt: "asc" },
                },
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return postData;
  });

  return result;
};

// Get my posts
const getMyPosts = async (authorId: string) => {
  // find the user status active or not
  await prisma.user.findUniqueOrThrow({
    where: {
      id: authorId,
      status: "ACTIVE",
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  // count the total post we write the code here as we already include in the top block
  const total = await prisma.post.count({
    where: {
      authorId,
    },
  });

  return { data: result, total };
};

// update posts
const updatePost = async (
  postId: string,
  data: Partial<Post>,
  authorId: string,
  isAdmin: boolean,
) => {
  // need to check the post creator is the login user or not
  const postData = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  // if user not admin or the post creator then through an error
  if (!isAdmin && postData.authorId !== authorId) {
    throw new Error("You are not owner/creator of this post");
  }

  // if not Admin then can't change the isFeatured
  if (!isAdmin) {
    delete data.isFeatured;
  }

  // update the post if this post creator is the login user
  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data,
  });

  return result;
};

// Delete Posts
const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  // first try to find that the data is exists or not
  const postData = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  // need to check the it Admin or not and it's user own post or not
  if (!isAdmin && postData?.authorId !== authorId) {
    throw new Error("You are not authorized to delete the post");
  }

  return await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

// Statistics and Analytics API data
const getStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalComments,
      approvedComments,
      totalUsers,
      adminCount,
      userCount,
      totalViews,

    ] = await Promise.all([
      await tx.post.count(),

      await tx.post.count({ where: { status: PostStatus.PUBLISHED } }),

      await tx.post.count({ where: { status: PostStatus.DRAFT } }),

      await tx.post.count({ where: { status: PostStatus.ARCHIVED } }),

      await tx.comment.count(),

      await tx.comment.count({where:{status:CommentStatus.APPROVED}}),

      await tx.user.count(),

      await tx.user.count({where:{role:UserRole.ADMIN}}),

      await tx.user.count({where:{role:UserRole.USER}}),

      await tx.post.aggregate({_sum:{views:true}}),
    ]);

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalComments,
      approvedComments,
      totalUsers,
      adminCount,
      userCount,
      totalViews:totalViews._sum.views,
    };
  });
};

export const postServices = {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats,
};
