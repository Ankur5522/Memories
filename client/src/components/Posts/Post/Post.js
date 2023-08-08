import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.userData?.sub || user?.userData?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length === 1
            ? `${post.likes.length} Like`
            : `${post.likes.length} Likes`}
        </>
      ) : (
        <>
          <ThumbUpOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className="card" raised elevation={6} sx={{borderRadius: "0.8rem"}}>
      <CardMedia
        component="img"
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.userData?.sub === post.creator ||
        user?.userData?._id === post.creator) && (
        <div className="overlay2">
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className="title" variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.userData}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
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
