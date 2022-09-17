import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {Link,NavLink} from "react-router-dom"
import { logout } from "../features/authSlice";
import { message } from "antd";

const pages = ["Add Review", "Login", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const upset ="😤"
    const furious="😠" 
    const rpo="😡"

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src="emoticon-angry.png"
                        alt=""
                        style={{ marginRight: "0.5rem" }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        flexGrow={1}
                    >
                        <Stack spacing={0}>
                            <p style={{ lineHeight: "0.9" }}>
                                really <br />
                                pissed-off
                            </p>
                        </Stack>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem

                            // onClick={handleCloseNavMenu}
                            >
                                <NavLink
                                    to="/add-new-review"
                                    textalign="center"
                                >
                                    Add Review
                                </NavLink>
                            </MenuItem>

                            <MenuItem

                            // onClick={handleCloseNavMenu}
                            >
                                <NavLink to="/auth" textalign="center">
                                    Login
                                </NavLink>
                            </MenuItem>

                            <MenuItem

                            // onClick={handleCloseNavMenu}
                            >
                                <NavLink to="/blog" textalign="center">
                                    Blog
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: "none", md: "flex" },
                            marginRight: "5rem",
                        }}
                    >
                        {user ? (
                            <>
                                <MenuItem

                                // onClick={handleCloseNavMenu}
                                >
                                    <NavLink
                                        style={{ color: "#fff" }}
                                        to="/protected/add-new-review"
                                        textalign="center"
                                    >
                                        Add Review
                                    </NavLink>
                                </MenuItem>

                                <MenuItem

                                // onClick={handleCloseNavMenu}
                                >
                                    <NavLink
                                        style={{ color: "#fff" }}
                                        to="/protected/blog"
                                        textalign="center"
                                    >
                                        Blog
                                    </NavLink>
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem

                            // onClick={handleCloseNavMenu}
                            >
                                <NavLink
                                    style={{ color: "#fff" }}
                                    to="/auth"
                                    textalign="center"
                                >
                                    Login
                                </NavLink>
                            </MenuItem>
                        )}
                    </Box>

                    {/* user account section */}
                    {user && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: "success.light",
                                            marginRight: "0.3rem",
                                        }}
                                        // alt="Remy Sharp"
                                        // src="/static/images/avatar/2.jpg"
                                    >
                                        {user.name.charAt(0)}
                                        {user.name.split(" ")[1].charAt(0)}
                                    </Avatar>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                        style={{
                                            color: "#000",
                                            textAlign: "center",
                                        }}
                                        to="/protected/profile"
                                        // textAlign="center"
                                    >
                                        Profile
                                    </Link>
                                </MenuItem>

                                {user.isAdmin && (
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Link
                                            style={{
                                                color: "#000",
                                                textAlign: "center",
                                            }}
                                            to="/protected/dashboard"
                                            // textAlign="center"
                                        >
                                            Dashboard
                                        </Link>
                                    </MenuItem>
                                )}

                                <MenuItem
                                    onClick={() => {
                                        dispatch(logout());
                                        message.info(
                                            `See you next time, ${user.name}`
                                        );
                                    }}
                                >
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
