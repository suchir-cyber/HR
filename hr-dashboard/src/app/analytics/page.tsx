import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { useEmployeeStore } from '../store/employeeStore'; 

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

export default function Analytics() {
  const { employees } = useEmployeeStore(); 
  const [departmentStats, setDepartmentStats] = useState({});

  useEffect(() => {
    const deptRatings = {};
    employees.forEach(emp => {
      const dept = emp.department;
      if (!deptRatings[dept]) deptRatings[dept] = { total: 0, count: 0 };
      deptRatings[dept].total += emp.rating;
      deptRatings[dept].count++;
    });

    const avgRatings = {};
    Object.keys(deptRatings).forEach(dept => {
      avgRatings[dept] = deptRatings[dept].total / deptRatings[dept].count;
    });

    setDepartmentStats(avgRatings);
  }, [employees]);

  const barData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: 'Average Rating by Department',
        data: Object.values(departmentStats),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Department-wise Average Ratings',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Mocked Bookmark Trends',
        data: [2, 5, 8, employees.length], 
        borderColor: 'rgba(255, 99, 132, 0.6)',
        borderWidth: 2,
        tension: 0.3,
        fill: false,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Bookmark Trends Over Time (Mocked)',
      },
    },
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-2xl font-bold">📊 Analytics</h2>

      <div className="mb-8">
        <h5 className="text-lg mb-2 font-semibold">Department-wise Average Ratings</h5>
        {Object.keys(departmentStats).length > 0 ? (
          <Bar data={barData} options={barOptions} />
        ) : (
          <p className="text-gray-500">No rating data available.</p>
        )}
      </div>

      <div>
        <h5 className="text-lg mb-2 font-semibold">Bookmark Trends (Mocked)</h5>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}
