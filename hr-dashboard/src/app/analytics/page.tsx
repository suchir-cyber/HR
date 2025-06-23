'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEmployeeStore } from '../../store/employeeStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const { employees } = useEmployeeStore();
  const [departmentStats, setDepartmentStats] = useState(null);
  const [bookmarkTrends, setBookmarkTrends] = useState(null);
  console.log('Employee data:', employees);

  useEffect(() => {
    if (!employees || employees.length === 0) {
      console.warn('No employees found in store');
      return;
    }

    const deptRatings = {};

    employees.forEach(emp => {
      const dept = emp?.company?.department || 'N/A';
      if (!deptRatings[dept]) deptRatings[dept] = { total: 0, count: 0 };
      deptRatings[dept].total += emp.rating || 0;
      deptRatings[dept].count++;
    });

    const avgRatings = {};
    Object.keys(deptRatings).forEach(dept => {
      const count = deptRatings[dept].count || 1;
      avgRatings[dept] = +(deptRatings[dept].total / count).toFixed(2);
    });

    const mockBookmarkData = {};
    Object.keys(deptRatings).forEach(dept => {
      mockBookmarkData[dept] = Math.floor(Math.random() * deptRatings[dept].count);
    });

    setDepartmentStats(avgRatings);
    setBookmarkTrends(mockBookmarkData);
  }, [employees]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
  };

  const ratingBarData = departmentStats && {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: 'Avg Rating by Department',
        data: Object.values(departmentStats),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const bookmarkTrendData = bookmarkTrends && {
    labels: Object.keys(bookmarkTrends),
    datasets: [
      {
        label: 'Mocked Bookmark Trends',
        data: Object.values(bookmarkTrends),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">📈 Analytics Dashboard</h2>

      {!departmentStats || !bookmarkTrends ? (
        <p>Loading analytics...</p>
      ) : (
        <>
          <h4>📊 Average Rating per Department</h4>
          <Bar data={ratingBarData} options={chartOptions} className="mb-5" />

          <h4>📌 Bookmark Trends (Mocked)</h4>
          <Bar data={bookmarkTrendData} options={chartOptions} />
        </>
      )}
    </div>
  );
}
