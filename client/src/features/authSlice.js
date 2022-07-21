import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {message} from "antd"

const initialState = {
    loading: false,
    error: false,
    user: JSON.parse(localStorage.getItem("user")),
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
    async (user, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/users/profile", {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().user.token
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
            state.loading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, { payload }) => {
            const user = payload;

            state.loading = false;
            state.user = user;

            localStorage.setItem("user", JSON.stringify(user));
            // message.success(`Welcome aboard, ${user.name}`)

            setTimeout(() => {
                if (user.isAdmin) {
                    window.location.href = "/protected/dashboard";
                } else {
                    window.location.href = "/protected/profile";
                }
            }, 5000);
        });
        builder.addCase(signupUser.rejected, (state,action) => {
            state.loading = false;
            state.error = true;

            message.error(action.payload)
        });
        
        // ***login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            const user  = payload;
            console.log(user, payload);

            state.loading = false;
            state.user = user;

            localStorage.setItem("user", JSON.stringify(user));
            message.success(`Welcome back, ${user.name}`)

            setTimeout(() => {
                if (user.isAdmin) {
                    window.location.href = "/protected/dashboard";
                    
                } else {
                    
                    window.location.href = "/protected/profile";
                }
            }, 5000);
        });
        builder.addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = true;

            message.error(action.payload)
        });
        
        // ***get user profile
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
            
            state.loading = false;
            state.userProfile = payload;

        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = true;

            message.error(action.payload);
        });
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer