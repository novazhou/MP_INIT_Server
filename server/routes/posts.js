import express from "express";

import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../controller/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// http://localhost:5000/posts

router.get("/", getPosts); //get posts
router.post("/", auth, createPost); //crate post
router.patch("/:id", auth, updatePost); //update post
router.delete("/:id", auth, deletePost); //delete post
router.patch("/:id/likePost", auth, likePost); //like post

export default router;
