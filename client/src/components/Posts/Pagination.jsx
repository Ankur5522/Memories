import React, {useEffect} from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

const Paginate = ({page}) => {
  const dispatch = useDispatch();
  const numberOfPages = useSelector((state) => state.posts.numberOfPages)
  useEffect(() => {
    if(page) dispatch(getPosts(page));
  },[page])

  return (
    <Pagination
      page={Number(page) || 1}
      count={numberOfPages || 1}
      variant="outlined"
      color="primary"
      sx={{
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px'
      }}
      renderItem={(item) => (
        <PaginationItem component={Link} to={`/posts?page=${item.page}`} {...item} />
      )}
    />
  );
};

export default Paginate;
