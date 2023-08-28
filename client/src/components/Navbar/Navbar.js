import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Popover,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/auth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For popover
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    setUser(storedProfile);
  }, [isAuthenticated]);

  const Logout = () => {
    dispatch(logout());
    navigate("/");
    setUser(null);
    setAnchorEl(null); // Close the popover after logout
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

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
              sx={{
                flexGrow: 1,
                fontSize: isMobile ? "1.5rem" : "2rem", // Adjust font size based on media query
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Memories
            </Typography>
          </Box>
          <Toolbar className="toolbar">
            {user ? (
              <div className="profile">
                {isMobile && ( // Only show avatar as trigger on mobile
                  <Avatar
                    className="purple"
                    alt={user.userData.name}
                    src={user.userData.picture}
                    onClick={handleAvatarClick}
                  >
                    {user.userData.name.charAt(0)}
                  </Avatar>
                )}
                <Popover
                  open={openPopover && isMobile}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ padding: 2 }}>
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
                  </Box>
                </Popover>
                {!isMobile && ( // Show user profile info on larger screens
                  <>
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
                  </>
                )}
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
