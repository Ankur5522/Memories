import express from "express";
import {getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";

import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/search', getPostsBySearch)
router.post('/', auth , createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.post('/:id/commentPost',auth ,commentPost)
router.patch('/:id/likePost',auth ,likePost)

export default router;