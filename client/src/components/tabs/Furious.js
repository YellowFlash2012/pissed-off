import { Box } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";

import Alert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";


import ReviewCard from "../ReviewCard";
import GlobalLoader from "../GlobalLoader";
import ErrorAlert from "../ErrorAlert";

const Furious = () => {
    const { data, error, isLoading, isError } = useQuery(
        "getFuriousReviews",
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

    // console.log(data);

    if (isLoading) {
        return (
            <GlobalLoader />
        );
    }

    if (isError) {
        return (
            <ErrorAlert error={error} />
        );
    }

    const upset = "😤";
    const furious = "😠";
    const rpo = "😡";

    return (
        <Box sx={{ flexGrow: 1 }}>
            {data.data.data.furiousReviews === "undefined" && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity="error">No review yet, add one!</Alert>
                </Box>
            )}
            {!isLoading && data?.data.data.furiousReviews.length === 0 ? (
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
                        data?.data.data.furiousReviews.map((rw) => (
                            <Grid item xs={2} sm={4} md={4} key={rw._id}>
                                <ReviewCard rw={rw} />
                            </Grid>
                        ))}
                </Grid>
            )}
        </Box>
    );
};
export default Furious;
