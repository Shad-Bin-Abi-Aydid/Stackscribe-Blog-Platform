import express from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middlewares/auth";


const router = express.Router();

// get the all posts
router.get('/', postController.getAllPost);

// get a single post
router.get('/:postId', postController.getPostById);

// post data
router.post("/", auth(UserRole.USER), postController.createPost);

export const postRouter = router;
