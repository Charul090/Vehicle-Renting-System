import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux"

export default function BarChart() {

    let { graph } = useSelector(state => state.dashboard)

    let data = {
        labels: graph.label,
        datasets: [
            {
                label: 'Number of Rides',
                backgroundColor: 'rgba(183, 28, 28,1.0)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(183, 28, 28,0.4)',
                data: graph.data
            }
        ]
    }

    let options = {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0
                }
            }]
        }
    };


    return (
        <>
            <Bar data={data} options={options}/>
        </>
    )
}
