// import express from "express";
const express = require("express")

// import { getPosts, createPost } from "../controllers/posts.js";
const {getPosts, createPost, updatePost, deletePost, likePost} = require("../controllers/posts")

const auth = require('../middleware/auth')

const router = express.Router()

router.get("/", getPosts)
router.post("/post", auth, createPost)
router.patch("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/likePost", auth, likePost)

// export default router
module.exports = router;