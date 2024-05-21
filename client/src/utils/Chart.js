import React from "react";

import { Bar } from "react-chartjs-2";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useGetAllReviewsQuery } from "../features/reviewsSlice";
import GlobalLoader from "../components/GlobalLoader";
import ErrorAlert from "../components/ErrorAlert";
import { useParams } from "react-router-dom";




const Chart = () => {

    const { keyword, pageNumber } = useParams();

    const { data, error, isLoading } = useGetAllReviewsQuery({ keyword, pageNumber });
    
    // console.log(data);

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
                data: data?.reviewsAgg.map((num) => num.count),
                backgroundColor:
                    "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    
    return (
        <>
            {isLoading ? (
                <GlobalLoader />
            ) : error ? (
                <ErrorAlert error={error?.data?.message || error?.error} />
            ) : (
                <Bar options={options} data={chartData} />
            )}
        </>
    );
};
export default Chart;
