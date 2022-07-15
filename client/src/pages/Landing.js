
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
                            Why another review site?
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            That's a fair question. The need arose from the fact
                            that I noticed that throughout my daily life and
                            routine, I come across challenges that really piss
                            me off but then I don't report or make mention of
                            them on review sites because I don't think of them
                            as important to warrant writing a review. But at the
                            same time, I think it'd be good for other people to
                            know about those and prepare in consequence, not to
                            avoid them all together, but to be ready to deal
                            with them when they show up.
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
