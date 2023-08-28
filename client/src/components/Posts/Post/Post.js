import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [liked, setLiked] = useState(
    post.likes.includes(user?.userData?.sub) ||
      post.likes.includes(user?.userData?._id)
  );
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  console.log(post.selectedFile)
  return (
    <Card className="card" raised elevation={6} sx={{ borderRadius: "0.8rem" }}>
      <CardMedia
        component="img"
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h5" width="10rem">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.userData?.sub === post.creator ||
        user?.userData?._id === post.creator) && (
        <div className="overlay2">
          <Tooltip title="update">
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </Tooltip>
        </div>
      )}
      <ButtonBase
        onClick={openPost}
        sx={{ display: "block", textAlign: "initial" }}
      >
        <div className="details">
          <Typography variant="body2" color="textSecondary">
            {post.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className="title" variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent sx={{ height: "5rem", overflow: "hidden" }}>
          <Typography variant="body2" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.userData}
          onClick={() => {
            setLiked(!liked);

            setLikesCount(liked ? likesCount - 1 : likesCount + 1);

            dispatch(likePost(post._id));
          }}
        >
          {liked ? (
            <>
              <ThumbUpAltIcon fontSize="small" />
              &nbsp;{likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </>
          ) : (
            <>
              <ThumbUpOutlinedIcon fontSize="small" />
              &nbsp;{likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </>
          )}
        </Button>
        {(user?.userData?.sub === post.creator ||
          user?.userData?._id === post.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
