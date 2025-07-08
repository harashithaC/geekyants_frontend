
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAPI = createAsyncThunk(
    "login/authlogin",
    async (userDetails) => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", userDetails);
        return response;
      } catch (error) {
        alert(`${error.response.data.message}`);
        throw error;
      }
    }
  );
  export const loginSlice = createSlice({
    name: "login",
    initialState: {
      loading: false,
      error: null,
    },
    reducers: {},
  });
  export default loginSlice.reducer;
