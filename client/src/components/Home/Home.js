import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPostsBySearch } from "../../actions/posts";
import Paginate from "../Posts/Pagination";
import { useDispatch } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      console.log("search: ", search)
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { 
      searchPost();
    }
  };

  const handleTagChange = (tag) => {
    setTags(tag);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className="mainContainerApp"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              sx={{
                borderRadius: 4,
                marginBottom: "1rem",
                display: "flex",
                padding: "16px",
              }}
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <MuiChipsInput
                sx={{ margin: "10px 0" }}
                value={tags}
                label="Search Tags"
                onChange={handleTagChange}
                variant="outlined"
              />
              <Button onClick={searchPost} color="secondary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) &&
            <Paper elevation={6}>
              <Paginate page = {page}/>
            </Paper>
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
