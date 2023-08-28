import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper} from "@mui/material";
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const isloading = useSelector((state) => state.auth.loading);
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updatePost({id: currentId, post: {...postData, name: user?.userData?.name}}))
        }
        else {
            dispatch(createPost({...postData, name: user?.userData?.name}))
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if(!user?.userData && !isloading) {
        return (
            <Paper className="paper">
                <Typography variant="h6" align="center">
                    Please Sign-In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
            isloading ? (
                <Paper>
                    <Typography color={'inherit'}>Loading...</Typography>
                </Paper>
            ) : (<Paper className="paper" raised="true" elevation={6} >
            <form autoComplete="off" noValidate className="form1" onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
            <TextField 
            name="title" 
            variant="outlined" 
            label="Title" 
            className="textInput"
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}
            />
            <TextField 
            name="message" 
            variant="outlined" 
            label="Message" 
            className="textInput"
            fullWidth
            value={postData.message}
            onChange={(e) => setPostData({...postData, message: e.target.value})}
            />
            <TextField 
            name="tags" 
            variant="outlined" 
            label="Tags" 
            className="textInput"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({...postData, tags: e.target.value.split(",")})}
            />
            <div className="fileInput">
                <FileBase 
                    type= "file"
                    multiple={false}
                    onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                />
            </div>
            <Button className="buttonSubmit" variant="contained" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>)
    )
}

export default Form;