import { Box, Button, Card, CardContent, Divider, MenuItem, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Alert } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";



import GlobalLayout from "../components/GlobalLayout";
import { useAddAReviewMutation } from "../features/reviewsSlice";
import ButtonLoader from "../components/ButtonLoader";

// import "react-quill/dist/quill.snow.css";
// import { addNewReview } from "../features/reviewsSlice";



const NewReview = () => {
    
    const [values, setValues] = useState({
        title: "",
        rating:"",
        content: "",
        
        emptyFields:false
    });

    
    const [addAReview, { isLoading }] = useAddAReviewMutation();
    
    
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };
    

    const addNewReviewHandler = async(e) => { 
        e.preventDefault()

        if (!values.title || !values.rating || !values.content) {
            setValues({...values, emptyFields:true})

            setTimeout(() => {
                setValues({ ...values });
            }, 5000);

            return;
        }

        // dispatch(addNewReview({ title: values.title, rating: values.rating, content: values.content }));

        try {
            const { title, rating, content } = values;
            const data = { title, rating, content };

            const res = await addAReview(data).unwrap();

            toast.success(res?.message)

        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
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
                    marginTop: "2rem",
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
                            type="text"
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            value={values.title}
                            onChange={handleChange("title")}
                            required
                            helperText=" "
                            fullWidth
                        />

                        <TextField
                            select
                            label="Rating"
                            value={values.rating}
                            onChange={handleChange("rating")}
                            required
                            helperText=" "
                            fullWidth
                        >
                            <MenuItem value=""> -- select --</MenuItem>
                            <MenuItem value="upset">Upset</MenuItem>
                            <MenuItem value="furious">Furious</MenuItem>
                            <MenuItem value="really-pissed-off">
                                Really-pissed-off
                            </MenuItem>
                        </TextField>

                        <textarea
                            name=""
                            id=""
                            cols="87"
                            rows="10"
                            value={values.content}
                            onChange={handleChange("content")}
                        ></textarea>

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
                            >
                                {isLoading ? <ButtonLoader/> : "Add A Review"}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </GlobalLayout>
    );
};
export default NewReview;
