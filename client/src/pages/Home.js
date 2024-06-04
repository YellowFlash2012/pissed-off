import React, {Suspense} from "react"

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import GlobalLayout from "../components/GlobalLayout";


const All = React.lazy(() => import("../components/tabs/All"));
const Upset = React.lazy(() => import("../components/tabs/Upset"));
const Furious = React.lazy(() => import("../components/tabs/Furious"));
const PissedOff = React.lazy(() => import("../components/tabs/PissedOff"));

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

                <Suspense fallback={<div>Loading...</div>}>

                <TabPanel value="1">
                    <All />
                </TabPanel>
                <TabPanel value="2">
                    <Upset />
                </TabPanel>
                <TabPanel value="3">
                    <Furious />
                </TabPanel>
                <TabPanel value="4">
                    <PissedOff />
                </TabPanel>
                </Suspense>
</TabContext>
        </Box>
    </GlobalLayout>;
};
export default Home;
