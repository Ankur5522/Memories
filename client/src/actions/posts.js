import * as api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk('posts/fetchAll', async (page) => {
    try {
        const response = await api.fetchPosts(page);
        const data = response.data;
        return data;
    } catch(error) {
        console.log(error.message);
    }
});

export const getPostsBySearch = createAsyncThunk('posts/fetchBySearch', async (searchQuery) => {
    try {
        const response = await api.fetchPostsBySearch(searchQuery);
        const data = response.data.data;
        return data;
    } catch(error) {
        console.log(error.message);
    }
});

export const createPost = createAsyncThunk('Posts/create',async(post) => {
    try {
        const response = await api.createPosts(post);
        const data = response.data;
        return data;
    } catch(error) {
        console.log(error.message);
    }
});

export const updatePost = createAsyncThunk('Posts/update',async({id, post}) => {
    try {
        const response = await api.updatePost(id, post);
        const data = response.data;
        return data;
    } catch(error) {
        console.log(error.message);
    }
});

export const deletePost = createAsyncThunk('Posts/delete',async(id) => {
    try {
        await api.deletePost(id);
        return id;
    } catch(error) {
        console.log(error);
    }
});

export const likePost = createAsyncThunk('Posts/like',async(id) => {
    try {
        const response = await api.likePost(id);
        const data = response.data;
        return data;
    } catch(error) {
        console.log(error.message);
    }
});