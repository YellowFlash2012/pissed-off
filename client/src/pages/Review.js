import { Box, Card, CardContent, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";

import { DiscussionEmbed } from "disqus-react";

import GlobalLayout from "../components/GlobalLayout";

const Review = () => {
    const { id } = useParams();
    
    

    const { data, error, isLoading, isError } = useQuery(
        "getOneReview",
        () => {
            return axios.get(`/api/v1/reviews/${id}`);
        },
        {
            cacheTime:600000
        }
    );

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

    // console.log(data);

    return (
        <GlobalLayout>
            <Box marginY="1rem" marginLeft="1rem">

            <Link to="/home">Back Home</Link>
            </Box>
            <Box>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3">
                            {data.data?.title}
                        </Typography>

                        <Typography gutterBottom variant="h4">
                            <Link to="#">{data.data?.name}</Link>
                        </Typography>

                        <Typography gutterBottom variant="h4">
                            {data.data?.rating}
                        </Typography>

                        <Typography gutterBottom variant="subtitle1">
                            {data.data?.createdAt}
                        </Typography>

                        <Typography gutterBottom paragraph="true">
                            {data.data?.content}
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <DiscussionEmbed
                            shortname="reallypissed-off"
                            config={{
                                url: "http://localhost:3000",
                                identifier: data.data._id,
                                title: data.data.title,
                                language: "en_EN", //e.g. for Traditional Chinese (Taiwan)
                            }}
                        />
                    </CardContent>
                </Card>
            </Box>
        </GlobalLayout>
    );
};
export default Review;
