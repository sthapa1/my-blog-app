import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ROUTES from '../../constants/apiRoutes';
import Status from '../../constants/status';

const sliceName = 'posts';

const initialState = {
    status: Status.IDLE,
    error: null,
    categories: []
};

export const fetchCategoriesAction = createAsyncThunk(
    `${sliceName}/fetchCategoriesAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(`${API_ROUTES.BASE}/categories`);
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
        })
    }
})

export default postSlice.reducer;