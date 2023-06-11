import Box from "@mui/material/Box";
import { PropagateLoader } from "react-spinners";

const GlobalLoader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
            }}
        >
            <PropagateLoader color="#36d7b7" size={25} />
        </Box>
    );
};
export default GlobalLoader;
