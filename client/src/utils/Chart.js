import axios from "axios";
import { useQuery } from "react-query";

import CircularProgress from "@mui/material/CircularProgress";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import { message } from "antd";




const Chart = () => {

    const { data, error, isLoading, isError } = useQuery(
        "getAllReviews",
        async () => {
            return await axios.get("/api/v1/reviews");
        },
        {
            cacheTime: 600000,
            // staleTime:60000
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="success" size="20rem" />
            </Box>
        );
    }

    if (isError) {
        message.error(error)
        
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "# of reviews per category",
            },
        },
    };

    const labels = ["upset", "furious", "really-pissed-off"];

    const chartData = {
        labels,
        datasets: [
            {
                label: "Categories",
                data: data?.data.reviewsAgg.map((num) => num.count),
                backgroundColor:
                    "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    
    return <Bar options={options} data={chartData} />;
};
export default Chart;
