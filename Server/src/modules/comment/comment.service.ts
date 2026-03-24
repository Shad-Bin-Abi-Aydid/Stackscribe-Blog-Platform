import { Result } from "pg";
import { prisma } from "../../lib/prisma";
import { CommentStatus } from "../../../generated/prisma/enums";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  //check the postId is exist or not
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  // check the parentId is exist or not
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }

  const result = await prisma.comment.create({
    data: payload,
  });

  return result;
};

// Get comment by id
const getCommentById = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
};

// Get Comment by authorId
const getCommentByAuthorId = async (id: string) => {
  return prisma.comment.findMany({
    where: {
      authorId: id,
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

// Delete a comment
const deleteComment = async (commentId: string, userId: string) => {
  // check the comment is exist or not and the user is same or not
  const commentData = await prisma.comment.findUnique({
    where: {
      id: commentId,
      authorId:userId
    },
    select:{
      id:true,
      content:true
    }
  });

  if(!commentData){
    throw new Error("Comment not Found!");
  }
  return await prisma.comment.delete({
    where:{
      id:commentData.id
    }
  })

  
};

// Update a comment
const updateComment = async (commentId:string, data:{content?:string, status?:CommentStatus}, authorId:string) =>{
  // check the comment is exist or not and the user is same or not
  const commentData = await prisma.comment.findUnique({
    where: {
      id: commentId,
      authorId
    },
    select:{
      id:true,
      content:true
    }
  });

  if(!commentData){
    throw new Error("Comment not Found!");
  }

  return await prisma.comment.update({
    where:{
      id:commentData.id
    },
    data
  })

}

// moderate comments - admin access in comment
const moderateComment = async(id:string, data:{status:CommentStatus}) =>{
  // Check the comment exists or not
  const commentData = await prisma.comment.findUniqueOrThrow({
    where:{
      id
    },
    select:{
      id:true,
      status:true
    }
  })

  if(commentData.status === data.status){
    throw new Error(`Your provided status (${data.status}) is already up to date`);
  }

  // if exists then update the comment

  return await prisma.comment.update({
    where:{
      id
    },
    data
  })
};

export const commentServices = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment,
  moderateComment,
};
