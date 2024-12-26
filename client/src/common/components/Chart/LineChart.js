import { Line } from 'react-chartjs-2';

const LineChart = ({ chartData }) => {

    if (!chartData) return <p>Loading...</p>;

    return <Line options={{responsive: true, maintainAspectRatio: false}} style={{ width: '100%'}} data={chartData} />;
};

export default LineChart;