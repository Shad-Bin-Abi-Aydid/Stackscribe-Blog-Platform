import { Request, Response } from "express";
import { postServices } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../middlewares/auth";

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

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

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
      sortOrder,
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
const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId as string;
    if (!postId) {
      throw new Error("Post Id required");
    }
    const result = await postServices.getPostById(postId);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Post Creation Failed",
      details: err,
    });
  }
};

// Get my posts
const getMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    console.log(user);
    const result = await postServices.getMyPosts(user?.id as string);

    res.status(200).json({
      result,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message || "Posts fetched failed",
    });
  }
};

// Update Post
const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    const { postId } = req.params;

    const isAdmin = user.role === UserRole.ADMIN;
    console.log(user)

    const result = await postServices.updatePost(
      postId as string,
      req.body,
      user.id as string,
      isAdmin,
    );

    res.status(200).json({
      result,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message || "Update post failed",
    });
  }
};

// Delete Post
const deletePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    const { postId } = req.params;

    const isAdmin = user.role === UserRole.ADMIN;

    const result = await postServices.deletePost(
      postId as string,
      user.id as string,
      isAdmin
    );

    res.status(200).json({
      result,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message || "Delete post failed",
    });
  }
};

// Statistics and Analytics API data
const getStats = async (req: Request, res: Response) => {
  try {
    

    const result = await postServices.getStats();

    res.status(200).json({
      result,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message || "Statistics and Analytics data fetch failed",
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
  deletePost,
  getStats,
};
