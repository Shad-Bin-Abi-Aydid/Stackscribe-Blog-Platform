import { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.createPost(req.body);
    res.status(200).send(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const postController = { createPost };
