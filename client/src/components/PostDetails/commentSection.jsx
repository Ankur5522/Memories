import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = async () => {
    const finalComment = `${user.userData.name}: ${comment}`;
    const id = post._id;
    await dispatch(commentPost({ value: finalComment, id }));
    setComment("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          flex: 1,
          height: "200px",
          overflowY: "auto",
          marginRight: "30px",
        }}
      >
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.map((c, i) => (
          <div key={i}>
            <Typography gutterBottom variant="subtitle2">
              {c}
            </Typography>
          </div>
        ))}
      </div>
      {user?.userData.name && (
        <div style={{ flex: 2 }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
