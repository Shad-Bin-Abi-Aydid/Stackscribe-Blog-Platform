import { Request, Response } from "express";
import { postServices } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

// Create posts
const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const result = await postServices.createPost(
      req.body,
      req.user.id as string,
    );
    res.status(200).send(result);
  } catch (err: any) {
    res.status(400).json({
      error: "Post Creation Failed",
      details: err,
    });
  }
};

// Get All posts
const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    // before passing the search we need to check it's type
    const searchString = typeof search === "string" ? search : "";

    // We received the tags and split them
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // getting the boolean field value
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;
    // "true" === "true"   // true
    // "false" === "true"  // false
    // undefined === "true" // false


    // received the status data
    const status = req.query.status as PostStatus;

    // Received the authorId 
    const authorId = req.query.authorId as string | undefined;


    const {page, limit, skip, sortBy, sortOrder} = paginationSortingHelper(req.query)


    const result = await postServices.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      error: "Post Creation Failed",
      details: err,
    });
  }
};

// Get Single Post
const getPostById = async(req:Request, res:Response) => {
  try{
    const postId = req.params.postId as string;
    if(!postId){
      throw new Error ("Post Id required")
    }
    const result = await postServices.getPostById(postId);

    res.status(200).json(result)

  }catch(err){
    res.status(400).json({
      error: "Post Creation Failed",
      details: err,

  })
}
}

export const postController = { createPost, getAllPost, getPostById }
