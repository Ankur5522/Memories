import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <GoogleOAuthProvider clientId="579190075824-kn8eskfl5t44phjlpe6lgr667vnfhua2.apps.googleusercontent.com">
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to ='/posts' />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id"  element={<PostDetails />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to ='/posts' />} />
        </Routes>
      </Container>
    </BrowserRouter>
            </GoogleOAuthProvider>
  );
}

export default App;
