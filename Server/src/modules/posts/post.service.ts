import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { PostStatus } from "../../../generated/prisma/enums";

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
    include:{
      _count:{
        select:{
          comments:true
        }
      }
    }
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
        _count:{
          select:{
            comments:true,
          }
        }
      },
    });

    return postData;
  });

  return result;
};

export const postServices = {
  createPost,
  getAllPost,
  getPostById,
};
