import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="notfound-container">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <WarningAmberIcon color="error" sx={{ fontSize: 280 }} />
            </Box>
            <h3>Page Not Found!</h3>

            <p>The page you are looking for doesn't exist</p>

            <Link to="/home">back home</Link>
        </div>
    );
};
export default NotFound;
