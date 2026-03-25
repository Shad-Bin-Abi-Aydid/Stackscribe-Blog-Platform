import express from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middlewares/auth";


const router = express.Router();

// get the all posts
router.get('/', postController.getAllPost);

// get Statistics and Analytics data
router.get('/stats', auth(UserRole.ADMIN), postController.getStats);

// get my post
router.get('/my-post',auth(UserRole.USER, UserRole.ADMIN), postController.getMyPost);

// get a single post
router.get('/:postId', postController.getPostById);

// update post
router.patch('/:postId', auth(UserRole.USER, UserRole.ADMIN), postController.updatePost); 

// delete post
router.delete('/:postId', auth(UserRole.USER, UserRole.ADMIN), postController.deletePost); 

// post data
router.post("/", auth(UserRole.USER, UserRole.ADMIN), postController.createPost);

export const postRouter = router;
