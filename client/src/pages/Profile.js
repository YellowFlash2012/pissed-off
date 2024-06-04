
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
import { useGetMyProfileQuery } from "../features/authApiSlice";
import GlobalLoader from "../components/GlobalLoader";
import ErrorAlert from "../components/ErrorAlert";

const Profile = () => {
    const { user } = useSelector(store => store.auth);

    const { data, error, isLoading } = useGetMyProfileQuery()

    console.log(data);

    const upset = "😤";
    const furious = "😠";
    const rpo = "😡";

    return (
        <GlobalLayout>
            <>
            {
                isLoading ? <GlobalLoader/> : error ? <ErrorAlert error={error?.data?.message || error?.error} /> : (<Box sx={{ flexGrow: 1, marginTop: "2rem", paddingX: "2rem" }}>
                {!isLoading &&
                data?.data.reviews.length === 0 &&
                !user.isAdmin ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Alert severity="error">No review yet, add one!</Alert>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Stack
                                direction="row"
                                spacing={2}
                                marginBottom="2rem"
                            >
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
                                            subheader={
                                                rw.rating === "upset"
                                                    ? upset
                                                    : rw.rating === "furious"
                                                    ? furious
                                                    : rpo
                                            }
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
            </Box>)
            }
            </>
            
            
        </GlobalLayout>
    );
};
export default Profile;
