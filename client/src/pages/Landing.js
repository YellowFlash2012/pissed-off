
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
    Box,
    Button,
    
    CardContent,
    
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
                            Share critical feedback with other short term rental landlord
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            If you are short term rental landlord, doubtless you had had terrible clients. Kindly share your experience with them so that other fellow landlords may know what to expect and whether to have them as clients or not.  
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
