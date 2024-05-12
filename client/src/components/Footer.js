import { Box, Divider, Typography } from "@mui/material";

const Footer = () => {
    const currentYear = new Date().getFullYear()
    // const currentYear = currentDate.getFullYear();

    return <Box marginY="auto">
        <Divider />
        <Typography textAlign="center" variant="body1">
            Copyright &copy; Really Pissed-Off | {currentYear}
        </Typography>
    </Box>;
};
export default Footer;
