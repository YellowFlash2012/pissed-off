import { Box, Button, ButtonGroup, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import { Alert } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLayout from "../components/GlobalLayout";


const NewReview = () => {
    
    const [values, setValues] = useState({
        title: "",
        rating:"",
        content: "",
        
        emptyFields:false
    });
    
    const dispatch = useDispatch();
    
    const { loading, error } = useSelector(store => store.auth);
    
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const addNewReviewHandler = (e) => { 
        e.preventDefault()
    }
    
    return (
        <GlobalLayout>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "95ch" },
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    minHeight: "100vh",
                    marginTop:"2rem"
                }}
                noValidate
                autoComplete="off"
                onSubmit={addNewReviewHandler}
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
                        Write about what pissed you off
                    </Typography>

                    <Divider />

                    <CardContent>
                        

                        <TextField
                            type="email"
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            value={values.title}
                            onChange={handleChange("title")}
                            required
                            helperText=" "
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
                                Add Review
                            </Button>
                        </ButtonGroup>

                        
                    </CardContent>
                </Card>
            </Box>
        </GlobalLayout>
    );
};
export default NewReview;
