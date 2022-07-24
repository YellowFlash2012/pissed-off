

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

const initialState = {
    loading: false,
    error: false,
    
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
            state.loading = true;
        });
        builder.addCase(addNewReview.fulfilled, (state, { payload }) => {
            state.loading = false;

            message.success("You added a new review!");
        });
        builder.addCase(addNewReview.rejected, (state, action) => {
            state.loading = false;
            state.error = true;

            message.error(action.payload);
        });
    },
});

export default reviewsSlice.reducer;