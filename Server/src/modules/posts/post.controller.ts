import { Request, Response } from "express";
import { postServices } from "./post.service";

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

    const result = await postServices.getAllPost({
      search: searchString,
      tags,
      isFeatured,
    });
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({
      error: "Post Creation Failed",
      details: err,
    });
  }
};

export const postController = { createPost, getAllPost };
