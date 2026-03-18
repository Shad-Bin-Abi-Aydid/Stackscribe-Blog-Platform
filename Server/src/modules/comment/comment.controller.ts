import { Request, Response } from "express";
import { commentServices } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;

    const result = await commentServices.createComment(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Creation Failed",
      details: err,
    });
  }
};

// get Comment by id
const getCommentById = async (req:Request, res:Response) =>{
  try {
    
    const {commentId} = req.params;

    const result = await commentServices.getCommentById(commentId as string);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Fetch Failed",
      details: err,
    });
  }
}

// get Comment by Author Id
const getCommentByAuthorId = async (req:Request, res:Response) =>{
  try {
    
    const {authorId} = req.params;

    const result = await commentServices.getCommentByAuthorId(authorId as string);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Fetch Failed",
      details: err,
    });
  }
}

// Delete a comment
const deleteComment = async (req:Request, res:Response) =>{
  try {

    const {commentId} = req.params;
    const user = req.user

    const result = await commentServices.deleteComment(commentId as string, user?.id as string );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Fetch Failed",
      details: err,
    });
  }
}

// Update a comment
const UpdateComment = async (req:Request, res:Response) =>{
  try {

    const {commentId} = req.params;
    const user = req.user

    const result = await commentServices.updateComment(commentId as string,req.body, user?.id as string );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Update Failed",
      details: err,
    });
  }
}

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  UpdateComment
};
