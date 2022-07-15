import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import GlobalLayout from "../components/GlobalLayout";

const Home = () => {
    const [value, setValue] = useState('1');

    const handleChange = (e, newVal) => {
        setValue(newVal)
    }

    return <GlobalLayout>
        <Box>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList aria-label="nav tabs" onChange={handleChange} indicatorColor="primary" centered>
                        <Tab label="all" value="1" />
                        <Tab label="upset" value="2" />
                        <Tab label="furious" value="3" />
                        <Tab label="really-pissed-off" value="4" />
                    </TabList>
                </Box>

                <TabPanel value="1">content of all</TabPanel>
                <TabPanel value="2">content of upset</TabPanel>
                <TabPanel value="3">content of furious</TabPanel>
                <TabPanel value="4">content of really-pissed-off</TabPanel>
</TabContext>
        </Box>
    </GlobalLayout>;
};
export default Home;
