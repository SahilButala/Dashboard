
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import type { LoginFormData, SignUpData } from "@/config/types";
import {SigninService, SignUpService} from "../../../services/index"



interface AuthState {
  isLoading: boolean;
  user: any;
  isAuthenticated: boolean;
}

const initialState : AuthState= {
    isLoading : false,
    user : null,
    isAuthenticated : false
}

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (formdata: LoginFormData) => {
    const response = await SigninService(formdata);
    return response?.user;
  }
);
export const Registeruser = createAsyncThunk(
  "auth/res",
  async (formdata: SignUpData) => {
    const response = await SignUpService(formdata);
    return response;
  }
);

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
      reset : (state)=>{
         state.isAuthenticated = false,
         state.isLoading = false,
         state.user = null
         sessionStorage.removeItem("token")
      }
    },
    extraReducers : (builder)=>{
        builder.addCase(LoginUser.pending , (state)=>{
            state.isLoading = true
        }).addCase(LoginUser.fulfilled , (state,action)=>{
            state.isAuthenticated = true,
            state.isLoading = false,
            state.user = action.payload
        }).addCase(LoginUser.rejected , (state)=>{
            state.isAuthenticated = false,
            state.isLoading = false,
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions



export default authSlice.reducer