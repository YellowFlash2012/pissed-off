import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

import "./App.css";
import Review from "./pages/Review";

// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import NewReview from "./pages/NewReview";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./components/AdminRoutes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />

                <Route path="/protected" element={<ProtectedRoutes />}>
                    <Route path="/protected/review/:id" element={<Review />} />

                    <Route
                        path="/protected/add-new-review"
                        element={<NewReview />}
                    />

                    <Route path="/protected/blog" element={<Blog />} />

                    <Route path="/protected/profile" element={<Profile />} />
                </Route>

                <Route path="/admin" element={<AdminRoutes />}>
                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
