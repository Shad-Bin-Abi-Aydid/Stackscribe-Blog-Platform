import { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    if(!req.user){
      return res.status(400).json({
        error:'Unauthorized'
      })
    }
    const result = await postServices.createPost(req.body, req.user.id as string);
    res.status(200).send(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const postController = { createPost };
