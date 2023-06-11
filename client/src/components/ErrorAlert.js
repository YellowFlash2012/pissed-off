import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const ErrorAlert = ({ error }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Alert severity="error">{error}</Alert>
        </Box>
    );
};
export default ErrorAlert;
