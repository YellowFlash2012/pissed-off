import { useQuery } from "react-query";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Alert } from "antd";

import Grid from "@mui/material/Grid";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalLayout from "../components/GlobalLayout";

const Profile = () => {
    const { user } = useSelector(store => store.auth);

    const { data, error, isLoading, isError } = useQuery(
        "getUserProfile",
        async () => {
            return await axios.get("/api/v1/users/profile", {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
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
                <Alert message={error} type="error" showIcon />
            </Box>
        );
    }

    return (
        <GlobalLayout>
            <Box sx={{ flexGrow: 1, marginTop: "2rem", paddingX:"2rem" }}>
                {!isLoading && data?.data.reviews.length === 0 && !user.isAdmin ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Alert severity="error">No review yet, add one!</Alert>
                    </Box>
                ) : (
                        <>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>

                        <Stack direction="row" spacing={2} marginBottom="2rem">
                            <Chip label={user._id} color="success" />
                            <Chip label={user.name} color="primary" />
                            <Chip label={user.email} color="success" />
                        </Stack>
                            </Box>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {data?.data.reviews.map((rw) => (
                                <Grid item xs={2} sm={4} md={4} key={rw._id}>
                                    <Card>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    sx={{
                                                        bgcolor: `${rw.color}`,
                                                    }}
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
                                                <Link
                                                    to={`/protected/review/${rw._id}`}
                                                >
                                                    Read More
                                                </Link>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Box>
        </GlobalLayout>
    );
};
export default Profile;
