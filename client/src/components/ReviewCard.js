import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const ratingEmoji = {
    upset : "😤",
    furious : "😠",
    rpo : "😡"
}

const ReviewCard = ({rw}) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: `${rw.color}` }}>
                        {rw.name.charAt(0)}
                        {rw.name.split(" ")[1].charAt(0)}
                    </Avatar>
                }
                title={rw.title.substring(0, 25)}
                subheader={
                    rw.rating === "upset"
                        ? ratingEmoji.upset
                        : rw.rating === "furious"
                        ? ratingEmoji.furious
                        : ratingEmoji.rpo
                }
            />
            <Divider />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {rw.content.substring(0, 80)}{" "}
                    <Link to={`/protected/review/${rw._id}`}>Read More</Link>
                </Typography>
            </CardContent>
        </Card>
    );
};
export default ReviewCard;
