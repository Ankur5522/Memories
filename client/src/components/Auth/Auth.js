import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { auth } from "../../actions/auth";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] =useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      dispatch(signup(formData))
    } else {
      dispatch(signin(formData))
    }
    navigate('/')
  };
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setFormData(initialState);
    handleShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        dispatch(auth(tokenResponse.access_token))
        navigate('/')
    },
    flow: 'implicit'
  })

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ marginTop: 1 }}>
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "30px" }}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", marginTop: 5 }}
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            onClick={() => login()}
          >
            Sign in with Google 🚀{" "}
          </Button>
          {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                const info = jwt_decode(credentialResponse.credential);
                console.log(info);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />  */}
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
