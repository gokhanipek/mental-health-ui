import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

type Props = {
    datasetLabelA: string;
    datasetLabelB: string;
    datasetA: string[];
    datasetB: string[];
    labels: string[];
    country: string
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

export default function Chart({ datasetLabel, dataset, labels, country  }: Props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Demographics Chart of ${country} `,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: datasetLabel,
                data: dataset,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}