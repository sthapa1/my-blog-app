import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Status from '../../constants/status';
import api from '../../helpers/api';

const sliceName = 'posts';

const initialState = {
    status: Status.IDLE,
    error: null,
    categories: [],
    allPosts: [],
    userPosts: []
};


export const fetchCategoriesAction = createAsyncThunk(
    `${sliceName}/fetchCategoriesAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await api.get(`/categories`);
            return response.data;
        }catch(error){
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const createPostAction = createAsyncThunk(
    `${sliceName}/createPostAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await api.post(`/posts/create`, payload);
            return response.data;
        }catch(error){
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const fetchUserPostAction = createAsyncThunk(
    `${sliceName}/fetchUserPostAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await api.get(`/posts/user/${payload}`);
            return response.data;
        }catch(error){
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)
const postSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchCategoriesAction.fulfilled, (state, action)=>{
            state.categories = action.payload;
        });

        builder.addCase(fetchUserPostAction.fulfilled, (state, action)=>{
            state.userPosts = action.payload;
        });

        builder
            .addCase(createPostAction.fulfilled, (state, action)=>{
                state.status = Status.SUCCESS;
                state.error = null;
                state.userPosts = [action.payload, ...state.userPosts]
            })
            .addCase(createPostAction.pending, (state, action)=>{
                state.status = Status.PENDING;
                state.error = null;
            })
            .addCase(createPostAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
            });
    }
})

export default postSlice.reducer;