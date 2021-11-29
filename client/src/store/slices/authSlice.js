import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Status from '../../constants/status';
import api from '../../helpers/api';

const sliceName = 'auth';

const initialState = {
    isLoggedIn: false,
    status: Status.IDLE,
    isAuthenticating: false,
    user: null,
    error: null
};

export const registerAction = createAsyncThunk(
    `${sliceName}/registerAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await api.post(`/auth/register`, payload);
            return response.data;
        }catch(error){
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const loginAction = createAsyncThunk(
    `${sliceName}/loginAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await api.post(`/auth/login`, payload);
            return response.data;
        }catch(error){
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)
export const getLoggedInUser = createAsyncThunk(
    `${sliceName}/getLoggedInUser`,
    async (payload, thunkAPI) => {
        try {
            const response = await api.get(`/users/${payload}`);
            return response.data;
        }catch(error){
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        clearStatus: (state, action)=>{
            state.status = Status.IDLE;
        },
        logOut: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state, action)=>{
                state.status = Status.PENDING
            }).addCase(registerAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
            }).addCase(registerAction.fulfilled, (state, action)=>{
                state.status = Status.SUCCESS;
                state.error = null;
            })
        builder
            .addCase(loginAction.pending, (state, action)=>{
                state.status = Status.PENDING
            }).addCase(loginAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
            }).addCase(loginAction.fulfilled, (state, action)=>{
                state.status = Status.SUCCESS;
                state.error = null;
                state.isLoggedIn = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user_id', action.payload.user_id);
            })
        builder
            .addCase(getLoggedInUser.pending, (state, action)=>{
                state.isAuthenticating = true;
                state.isLoggedIn = false;
            }).addCase(getLoggedInUser.rejected, (state, action)=>{
                state.isAuthenticating = false;
                state.isLoggedIn = false;
            }).addCase(getLoggedInUser.fulfilled, (state, action)=>{
                state.isAuthenticating = false;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
    }
})

export default authSlice.reducer;
export const { clearStatus, logOut } = authSlice.actions;