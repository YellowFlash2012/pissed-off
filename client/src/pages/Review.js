import { Box, Card, CardContent, Typography } from "@mui/material";


import { Link, useParams } from "react-router-dom";

import { DiscussionEmbed } from "disqus-react";

import GlobalLayout from "../components/GlobalLayout";

import "./Review.css"
import { useGetOneReviewQuery } from "../features/reviewsSlice";
import GlobalLoader from "../components/GlobalLoader";
import ErrorAlert from "../components/ErrorAlert";

const Review = () => {
    const { id } = useParams();
    // console.log(id);
    
    const { data, error, isLoading } = useGetOneReviewQuery(id);

    // console.log(data);

    return (
        <>
            {isLoading ? (
                <GlobalLoader />
            ) : error ? (
                <ErrorAlert>{error}</ErrorAlert>
            ) : (
                <GlobalLayout>
                    <Box marginY="1rem" marginLeft="1rem">
                        <Link to="/home">Back Home</Link>
                    </Box>
                    <Box className="container">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h3">
                                    {data?.data?.title}
                                </Typography>

                                <Typography gutterBottom variant="h4">
                                    <Link to="#">{data?.data?.name}</Link>
                                </Typography>

                                <Typography gutterBottom variant="h4">
                                    {data?.data?.rating}
                                </Typography>

                                <Typography gutterBottom variant="subtitle1">
                                    {data?.data?.createdAt}
                                </Typography>

                                <Typography gutterBottom paragraph="true">
                                    {data?.data?.content}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <DiscussionEmbed
                                    shortname="reallypissed-off"
                                    config={{
                                        url: `https://really-pissed-off.herokuapp.com/protected/review/${id}`,
                                        identifier: data.data._id,
                                        title: data.data.title,
                                        language: "en_EN",
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Box>
                </GlobalLayout>
            )}
        </>
    );
};
export default Review;
