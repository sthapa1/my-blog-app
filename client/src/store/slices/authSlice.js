import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ROUTES from '../../constants/apiRoutes';
import Status from '../../constants/status';

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
            const response = await axios.post(`${API_ROUTES.AUTH}/register`, payload);
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
    reducers: {},
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
    }
})

export default authSlice.reducer;