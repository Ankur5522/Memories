import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const isloading = useSelector((state) => state.auth.loading);

    if(!posts.length && status === "idle") return 'No Posts';
    return (
        status === "loadingposts" ? (
            <CircularProgress />
        ) : (
            <Grid className="container" container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;
