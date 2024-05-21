import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch} from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";

import { toast } from "react-toastify";
import { Alert} from 'antd';


import { setCredentials } from "../features/authSlice";

import ButtonLoader from "../components/ButtonLoader";
import { useLoginMutation, useRegisterMutation } from "../features/authApiSlice";

const Auth = () => {
    const [values, setValues] = useState({
        name: "",
        email:"",
        password: "",

        showPassword: false,
        isMember: false,
        emptyFields:false
    });

    const { name, email, password, showPassword, isMember, emptyFields } = values;

    // console.log(isMember);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading: registerLoading}] = useRegisterMutation();
    
    const [login, { isLoading: loginLoading}] = useLoginMutation();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const toggleLoginSignup = () => {
        setValues({
            ...values,
            isMember: !values.isMember,
        });
    }

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(values.name,values.email,values.password);

        if ((values.isMember && !values.name) || !values.email || !values.password) {
            setValues({
                ...values,
                emptyFields: true,
            });

            setTimeout(() => {
                setValues({ ...values })
            }, 5000);
            return;
        }

        if (values.isMember) {
            console.log(values.isMember);
            try {
                const data = { name, email, password };
                const res = await register(
                    data
                ).unwrap();

                dispatch(setCredentials({ ...res?.data }));
                
                toast.success(res?.message)

                navigate("/protected/add-new-review");
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            }

        } else {
            console.log(values.isMember);

            try {
                const data = { email, password };
                const res = await login(data).unwrap();

                // console.log(res);
    
                dispatch(setCredentials({ ...res?.data }));
    
                toast.success(res?.message)

                if (res?.data?.isAdmin) {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/protected/profile");
                }
                
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            }
            
        };
    }

        return (
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "45ch" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
                noValidate
                autoComplete="off"
                onSubmit={authSubmitHandler}
            >
                <Card>
                    {values.emptyFields && (
                        <Alert
                            message="Those fields can NOT be empty!"
                            // description="Those fields can NOT be empty!"
                            type="error"
                            banner
                            closable
                        />
                    )}
                    <Typography variant="h4" align="center">
                        {values.isMember ? "Sign Up" : "Login"}
                    </Typography>

                    <Divider />

                    <CardContent>
                        {values.isMember && (
                            <TextField
                                type="text"
                                id="outlined-basic"
                                label="Full Name"
                                variant="outlined"
                                value={values.name}
                                onChange={handleChange("name")}
                                required
                                helperText=" "
                                fullWidth
                            />
                        )}

                        <TextField
                            type="email"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange("email")}
                            required
                            helperText=" "
                            fullWidth
                        />
                        <TextField
                            type={values.showPassword ? "text" : "password"}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange("password")}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {values.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            helperText="13+ characters, 1 special character, 1 uppercase character, 1 number"
                            fullWidth
                        />

                        <Stack direction="column">
                            <Button
                                type="button"
                                variant="outlined"
                                color="error"
                                href="/home"
                                sx={{ marginY: "1rem" }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                size="large"
                                disabled={
                                    registerLoading || loginLoading
                                        ? true
                                        : false
                                }
                            >
                                {registerLoading || loginLoading ? (
                                    <ButtonLoader />
                                ) : isMember ? (
                                    "Sign Up"
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </Stack>

                        {values.isMember ? (
                            <p>
                                Already have an account? Login{" "}
                                <span
                                    className="auth-span"
                                    onClick={toggleLoginSignup}
                                >
                                    here
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account yet? Sign up{" "}
                                <span
                                    className="auth-span"
                                    onClick={toggleLoginSignup}
                                >
                                    here
                                </span>
                            </p>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }


export default Auth;
