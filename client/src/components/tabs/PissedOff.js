import { Box } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const PissedOff = () => {
    const { data, error, isLoading, isError } = useQuery(
        "getRPOReviews",
        async () => {
            return await axios.get("/api/v1/reviews");
        },
        {
            cacheTime: 600000,
            // staleTime:60000
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    );

    console.log(data);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="success" size="20rem" />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {data.data.data.rpoReviews === "undefined" && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity="error">No review yet, add one!</Alert>
                </Box>
            )}
            {!isLoading && data?.data.data.rpoReviews.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity="error">No review yet, add one!</Alert>
                </Box>
            ) : (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {data &&
                        data?.data.data.rpoReviews.map((rw) => (
                            <Grid item xs={2} sm={4} md={4} key={rw._id}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                sx={{ bgcolor: `${rw.color}` }}
                                            >
                                                {rw.name.charAt(0)}
                                                {rw.name
                                                    .split(" ")[1]
                                                    .charAt(0)}
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
                                            <Link to={`/review/${rw._id}`}>
                                                Read More
                                            </Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            )}
        </Box>
    );
};
export default PissedOff;
