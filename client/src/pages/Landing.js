
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
    Box,
    Button,
    
    Card,
    
    CardContent,
    
    InputAdornment,
    
    Stack,
    
    Typography,
} from "@mui/material";

import "./Landing.css"


const Landing = () => {
    

    return (
        <Box className="landing-container">
            <Stack spacing={4} width="45rem">
                <Box className="landing-card">
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            textAlign="center"
                        >
                            Customer Feedback Analytics
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            Unlike other customer feedback platforms, our chief focus here is on the dreaded 1 and 2 stars that companies do their best to avoid or get rid off. We think that if studied and analyzed from an objective point of views, they could hold valuable insights that will help companies make better marketing and operating decisions 
                        </Typography>
                    </CardContent>
                </Box>

                <Button
                    sx={{width:"50%",alignSelf:"center"}}
                    variant="contained"
                    color="success"
                    href="/home"
                    
                >
                    Proceed
                    <NavigateNextIcon />
                </Button>
            </Stack>
        </Box>
    );
};
export default Landing;
