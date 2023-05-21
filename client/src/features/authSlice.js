import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {message} from "antd"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
    
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    
    oneUserByAdmin:null,
    users:[],
    userProfile:null
};

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (user, thunkAPI) => {
        try {
            const res = await axios.post("/api/v1/users", user);

            return res.data
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
); 

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, thunkAPI) => {
        try {
            const res = await axios.post("/api/v1/users/login", user);
            console.log(res);
            return res.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
); 

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            const res = await axios.post("/api/v1/users/logout");
            // console.log(res);
            return res.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
); 

export const getUserProfile = createAsyncThunk(
    "auth/getUserProfile",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/users/profile", {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().auth.user.token
                    }`,
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

// ***admin section
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (user, thunkAPI) => {
        // console.log(thunkAPI.getState().auth.user.token);
        try {
            const res = await axios.get("/api/v1/users", {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
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

export const getOneUser = createAsyncThunk(
    "auth/getOneUser",
    async (id, thunkAPI) => {
        console.log(thunkAPI.getState().auth.user.token);
        try {
            const res = await axios.get(`/api/v1/users/${id}`, {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().auth.user.token
                    }`,
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

const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, { payload }) => {
            state.user = null;
            localStorage.removeItem("user")
        }
    },
    extraReducers: (builder) => {
        // ***signup
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, { payload }) => {
            const user = payload;

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            
            state.user = user;

            localStorage.setItem("user", JSON.stringify(user));
        });
        builder.addCase(signupUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload;

            message.error(action.payload)
        });
        
        // ***login
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            const user = payload;

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            localStorage.setItem("user", JSON.stringify(payload));

            message.success(`Welcome back, ${user.name}`)

        });
        builder.addCase(loginUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload;

            message.error(action.payload)
        });
        
        // ***get user profile
        builder.addCase(getUserProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
            
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userProfile = payload;

        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload;

            message.error(action.payload);
        });
        
        // ***get all users by admin
        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
            const users = payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.users = users;
            

        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload;

            message.error(action.payload);
        });
        
        // ***get one user by admin
        builder.addCase(getOneUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOneUser.fulfilled, (state, { payload }) => {
            const user = payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.oneUserByAdmin = user;
            

        });
        builder.addCase(getOneUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.payload;

            message.error(action.payload);
        });
        
        
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer