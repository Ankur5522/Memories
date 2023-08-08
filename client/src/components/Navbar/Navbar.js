import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import memories from "../../images/memories.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/auth";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    setUser(storedProfile);
  }, [isAuthenticated]);

  useEffect(() => {
    const token = user?.token;
    let logoutTimer;

    if (token) {
      const decodedData = decode(token);
      const expirationTime = decodedData.exp * 1000;
      const currentTime = new Date().getTime();

      if (expirationTime < currentTime) {
        Logout();
      } else {
        const timeUntilExpiration = expirationTime - currentTime;
        logoutTimer = setTimeout(() => Logout(), timeUntilExpiration);
      }
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [user]);

  const Logout = () => {
    dispatch(logout());
    navigate("/");
    setUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="inherit"
        sx={{ borderRadius: 2, marginBottom: 5 }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component={Link}
              to="/"
              className="heading"
              variant="h2"
              sx={{ flexGrow: 1 }}
            >
              Memories
            </Typography>
            <img src={memories} alt="memories" height={40} />
          </Box>
          <Toolbar className="toolbar">
            {user ? (
              <div className="profile">
                <Avatar
                  className="purple"
                  alt={user.userData.name}
                  src={user.userData.picture}
                >
                  {user.userData.name.charAt(0)}
                </Avatar>
                <Typography className="userName" variant="h6">
                  {user.userData.name}
                </Typography>
                <Button
                  variant="contained"
                  className="logout"
                  color="secondary"
                  onClick={Logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
