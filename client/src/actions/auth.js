import {createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js"

export const auth = createAsyncThunk("Auth/login", async (data) => {
  const url = "https://www.googleapis.com/oauth2/v3/userinfo";

  const headers = {
    Authorization: `Bearer ${data}`,
  };

  try {
    const response = await fetch(url, { headers });

    

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    return {userData, token : data};
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  }
});

export const signin = createAsyncThunk('Auth/signin', async(formData) => {
  try {
    const { data } = await api.signin(formData)
    return data;
  } catch (error) {
    console.log(error)
  }
})

export const signup = createAsyncThunk('Auth/signup', async(formData) => {
  try {
    const { data } = await api.signup(formData)
    return data;
  } catch (error) {
    console.log(error)
  }
})