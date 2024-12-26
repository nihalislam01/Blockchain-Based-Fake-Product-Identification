import { Bar } from 'react-chartjs-2';

function BudgetChart ({ budgets }) {

const getAmountByClub = (budgets) => {
    return budgets.reduce((acc, budget) => {
        acc[budget.club] = (acc[budget.club] || 0) + parseFloat(budget.amountRequested);
        return acc;
    }, {});
    };
    
  const amountData = getAmountByClub(budgets);

  const data = {
    labels: Object.keys(amountData),
    datasets: [
      {
        label: 'Accepted Budget',
        data: Object.values(amountData),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Club wise budget',
        font: {
          size: 18,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BudgetChart;
