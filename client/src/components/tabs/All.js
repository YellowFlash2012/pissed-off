import { useQuery } from "react-query";
import axios from "axios";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";

import ReviewCard from "../ReviewCard";
import GlobalLoader from "../GlobalLoader";
import ErrorAlert from "../ErrorAlert";
import { useGetAllReviewsQuery } from "../../features/reviewsSlice";

const All = () => {
    const { data, error, isLoading } = useGetAllReviewsQuery();

    console.log(data);

    return (
        <>
        {
            isLoading ? <GlobalLoader /> : error ? <ErrorAlert error={error} /> : (<Box sx={{ flexGrow: 1 }}>
            {data?.data?.reviews === "undefined" && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity="error">No review yet, add one!</Alert>
                </Box>
            )}
            {!isLoading && data?.data?.reviews.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity="error">No review yet, add one!</Alert>
                </Box>
            ) : (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {
                        data?.data?.reviews.map((rw) => (
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
export default All;
