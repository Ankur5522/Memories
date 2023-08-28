import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { getPost, getPostsBySearch } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "./commentSection";

const PostDetails = () => {
  const { post, posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (status === "loading") {
    return (
      <Paper
        elevation={6}
        style={{
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (id) => navigate(`/posts/${id}`);

  return (
    <Paper style={{ padding: "20px 40px", borderRadius: "15px" }} elevation={6}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{flex: 2}}>
          <Typography variant="h2" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div style={{flex: 1, textAlign:"center"}}>
          <img
            src={post.selectedFile}
            alt={post.title}
            style={{ height: "24rem", borderRadius: "15px" }}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div>
          <Typography gutterBottom variant="h5">
            You might also like:{" "}
          </Typography>
          <Divider />
          <div style={{ display: "flex", gap: "5rem" }}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt={title} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
