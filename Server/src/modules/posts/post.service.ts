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
  authorId
}: {
  search: string,
  tags: string[],
  isFeatured: boolean | undefined,
  status: PostStatus | undefined,
  authorId: string | undefined
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

  if(typeof isFeatured === 'boolean'){
    andConditions.push({isFeatured})
  }


  if(status){
    andConditions.push({status})
  }

  // check the multiple tags search are true or not if true then push it to the array
  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }


  if(authorId){
    andConditions.push({authorId})
  }

  const allPost = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
  });

  return allPost;
};

export const postServices = {
  createPost,
  getAllPost,
};
