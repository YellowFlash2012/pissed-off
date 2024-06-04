import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;

            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        // logout: (state, { payload }) => {
        //     state.user = null;
        //     localStorage.removeItem("user")
        // }
    },
    // extraReducers: (builder) => {
    //     // ***signup
    //     builder.addCase(signupUser.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(signupUser.fulfilled, (state, { payload }) => {
    //         const user = payload;

    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;

    //         state.user = user;

    //         localStorage.setItem("user", JSON.stringify(user));
    //     });
    //     builder.addCase(signupUser.rejected, (state,action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.error = action.payload;

    //         message.error(action.payload)
    //     });

    //     // ***login
    //     builder.addCase(loginUser.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(loginUser.fulfilled, (state, { payload }) => {
    //         const user = payload;

    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;

    //         localStorage.setItem("user", JSON.stringify(payload));

    //         message.success(`Welcome back, ${user.name}`)

    //     });
    //     builder.addCase(loginUser.rejected, (state,action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.error = action.payload;

    //         message.error(action.payload)
    //     });

    //     // ***get user profile
    //     builder.addCase(getUserProfile.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {

    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.userProfile = payload;

    //     });
    //     builder.addCase(getUserProfile.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.error = action.payload;

    //         message.error(action.payload);
    //     });

    //     // ***get all users by admin
    //     builder.addCase(getAllUsers.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
    //         const users = payload;
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.users = users;

    //     });
    //     builder.addCase(getAllUsers.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.error = action.payload;

    //         message.error(action.payload);
    //     });

    //     // ***get one user by admin
    //     builder.addCase(getOneUser.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(getOneUser.fulfilled, (state, { payload }) => {
    //         const user = payload;
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.oneUserByAdmin = user;

    //     });
    //     builder.addCase(getOneUser.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.error = action.payload;

    //         message.error(action.payload);
    //     });

    // }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer