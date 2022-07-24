import { Box, Button, ButtonGroup, Card, CardContent, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { Alert } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";

import GlobalLayout from "../components/GlobalLayout";

import "react-quill/dist/quill.snow.css";
import { addNewReview } from "../features/reviewsSlice";



const NewReview = () => {
    
    const [values, setValues] = useState({
        title: "",
        rating:"",
        content: "",
        
        emptyFields:false
    });

    const [rating,setRating]=useState("")
    
    const dispatch = useDispatch();
    
    const { loading, error } = useSelector(store => store.auth);
    
    
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const addNewReviewHandler = (e) => { 
        e.preventDefault()

        if (!values.title || !values.rating || !values.content) {
            setValues({...values, emptyFields:true})

            setTimeout(() => {
                setValues({ ...values });
            }, 5000);

            return;
        }

        dispatch(addNewReview({ title: values.title, rating: values.rating, content: values.content }));
    }

    const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
    
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

                        <ReactQuill
                            
                            value={values.content}
                            onChange={handleChange("content")}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            className="ql-editor"
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
