import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { message } from "antd";

import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

import { PropagateLoader } from "react-spinners";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";




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
