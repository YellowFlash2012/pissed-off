import { Box } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";

import Alert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";


import ReviewCard from "../ReviewCard";
import GlobalLoader from "../GlobalLoader";
import ErrorAlert from "../ErrorAlert";
import { useGetAllReviewsQuery } from "../../features/reviewsSlice";

const Upset = () => {
    // const { data, error, isLoading, isError } = useQuery(
    //     "getUpsetReviews",
    //     async () => {
    //         return await axios.get("/api/v1/reviews");
    //     },
    //     {
    //         cacheTime: 600000,
    //         // staleTime:60000
    //         refetchOnMount: false,
    //         refetchOnWindowFocus: false,
    //     }
    // );

    const { data, error, isLoading } = useGetAllReviewsQuery();

    console.log(data);

    return (
        <>
        {
                isLoading ? <GlobalLoader /> : error ? <ErrorAlert error={error} /> : (<Box sx={{ flexGrow: 1 }}>
            {data?.data?.upsetReviews === "undefined" && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity="error">No review yet, add one!</Alert>
                </Box>
            )}
            {!isLoading && data?.data?.upsetReviews.length === 0 ? (
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
                        data?.data?.upsetReviews.map((rw) => (
                            <Grid item xs={2} sm={4} md={4} key={rw._id}>
                                <ReviewCard rw={rw} />
                            </Grid>
                        ))}
                </Grid>
            )}
        </Box>)
        }
        </>
        
    );
};
export default Upset;
