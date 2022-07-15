import Adb from "@mui/icons-material/Adb";
import AdbIcon from "@mui/icons-material/Adb";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useState } from "react";

const Landing = () => {
    const [formats, setFormats] = useState([]);
    const [value, setValue] = useState("");
    const [country, setCountry] = useState("");

    console.log({ formats });

    const formatChangeHandler = (e, updatedFormats) => {
        setFormats(updatedFormats);
        console.log(updatedFormats);
    };

    return (
        <Stack spacing={4}>
            <Stack spacing="2" direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>

            <Stack spacing="2" direction="row">
                <Button variant="text" color="primary">
                    Primary
                </Button>
                <Button variant="contained" size="small" color="secondary">
                    secondary
                </Button>
                <Button variant="text" size="large" color="error">
                    error
                </Button>
                <Button variant="contained" color="success">
                    success
                </Button>

                <Button endIcon={<Adb />} variant="contained" color="warning">
                    warning
                </Button>

                <Button
                    startIcon={<AdbIcon />}
                    variant="contained"
                    color="info"
                >
                    info
                </Button>
            </Stack>

            <Stack>
                <IconButton color="success" size="large">
                    <AdbIcon />
                </IconButton>
            </Stack>

            <Stack direction="row">
                <ToggleButtonGroup
                    aria-label="text formatting"
                    value={formats}
                    onClick={formatChangeHandler}
                >
                    <ToggleButton value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>

                    <ToggleButton value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>

                    <ToggleButton value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack spacing={4}>
                <TextField label="name" size="small" sx={{ width: "15rem" }} />
                <TextField
                    label="last name"
                    size="small"
                    sx={{ width: "15rem" }}
                    required
                    helperText="do NOT share your otp"
                />
            </Stack>

            <Stack spacing={4}>
                <TextField
                    label="Amount"
                    sx={{ width: "25rem" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    }}
                    error={!value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <TextField
                    label="Weight"
                    sx={{ width: "15rem" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">KG</InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Password"
                    sx={{ width: "15rem" }}
                    type="password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <VisibilityOffIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Box width="25rem">
                <TextField
                    label="Select Country"
                    select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="CO">Colombia</MenuItem>
                    <MenuItem value="ZW">Zimbabwe</MenuItem>
                    <MenuItem value="ML">Malaysia</MenuItem>
                </TextField>
            </Box>
        </Stack>
    );
};
export default Landing;
