

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
    
};

export const addNewReview = createAsyncThunk(
    "auth/addNewReview",
    async (review, thunkAPI) => {
        try {
            const res = await axios.post("/api/v1/reviews", review, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.token}`,
                },
            });
            // console.log(res);
            return res.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        // ***add new review
        builder.addCase(addNewReview.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addNewReview.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            message.success("You added a new review!");
        });
        builder.addCase(addNewReview.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload;

            message.error(action.payload);
        });
    },
});

export default reviewsSlice.reducer;