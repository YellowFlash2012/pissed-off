import { useQuery } from "react-query";
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import Grid from "@mui/material/Grid";
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const All = () => {
    const { data, error, isLoading, isError } = useQuery("getAllReviews", () => {
        return axios.get("/api/v1/reviews")
    })

    // console.log(data);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent:"center" }}>
                <CircularProgress color="success" size="20rem" />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: "flex", justifyContent:"center" }}>
                
            <Alert severity="error">
                {error}
            </Alert>
            </Box>
        );
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {data.data?.reviews.map((rw) => (
                    <Grid item xs={2} sm={4} md={4} key={rw._id}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: `${rw.color}` }}>
                                        {rw.name.charAt(0)}
                                        {rw.name.split(" ")[1].charAt(0)}
                                    </Avatar>
                                }
                                title={rw.title.substring(0, 25)}
                                subheader={rw.rating}
                            />
                            <Divider />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {rw.content.substring(0, 80)}{" "}
                                    <Link to={`/review/${rw._id}`}>Read More</Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default All;
