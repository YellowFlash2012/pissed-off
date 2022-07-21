import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Button, ButtonGroup, Card, CardContent, Divider, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { Alert} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../features/authSlice";

const Auth = () => {
    const [values, setValues] = useState({
        name: "",
        email:"",
        password: "",

        showPassword: false,
        isMember: false,
        emptyFields:false
    });

    const dispatch = useDispatch();

    const { loading, error } = useSelector(store => store.auth);

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

    const authFormHandler = (e) => {
        e.preventDefault();
        console.log(values.name,values.email,values.password);

        if ((values.isMember && !values.name) || !values.email || !values.password) {
            setValues({
                ...values,
                emptyFields: true,
            });

            setTimeout(() => {
                setValues({...values})
            }, 5000);
            return;
        }

        if (values.isMember) {
            console.log("signup");
            dispatch(signupUser({ name: values.name, email: values.email, password: values.password }));
            
            // login immediately after successful signup
            if (!error) {
                
                dispatch(
                    loginUser({ email: values.email, password: values.password })
                    );
                }
        } else {
            console.log("login");
            dispatch(loginUser({email:values.email, password:values.password}));
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="success" size="20rem" />
            </Box>
        );
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
            onSubmit={authFormHandler}
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
                                        onMouseDown={handleMouseDownPassword}
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

                    <ButtonGroup orientation="vertical" fullWidth>
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
                        >
                            {values.isMember ? "Sign Up" : "Login"}
                        </Button>
                    </ButtonGroup>

                    {values.isMember ? (
                        <p>
                            Already have an account? Login{" "}
                            <Button onClick={toggleLoginSignup}>here</Button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account yet? Sign up{" "}
                            <Button onClick={toggleLoginSignup}>here</Button>
                        </p>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};
export default Auth;
