'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEmployeeStore } from '../../store/employeeStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const { employees } = useEmployeeStore();
  const [departmentStats, setDepartmentStats] = useState({});
  const [bookmarkTrends, setBookmarkTrends] = useState({});

  useEffect(() => {
    const deptRatings = {};
    employees.forEach(emp => {
      const dept = emp?.company?.department || 'N/A';
      if (!deptRatings[dept]) deptRatings[dept] = { total: 0, count: 0 };
      deptRatings[dept].total += emp.rating;
      deptRatings[dept].count++;
    });

    const avgRatings = {};
    Object.keys(deptRatings).forEach(dept => {
      avgRatings[dept] = deptRatings[dept].total / deptRatings[dept].count;
    });

    setDepartmentStats(avgRatings);

    // 🔸 Mock Bookmark Trends by Department
    const mockBookmarkData = {};
    Object.keys(deptRatings).forEach(dept => {
      mockBookmarkData[dept] = Math.floor(Math.random() * deptRatings[dept].count); // random bookmarks ≤ total count
    });
    setBookmarkTrends(mockBookmarkData);
  }, [employees]);

  const ratingBarData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: 'Avg Rating by Department',
        data: Object.values(departmentStats),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const bookmarkTrendData = {
    labels: Object.keys(bookmarkTrends),
    datasets: [
      {
        label: 'Mocked Bookmark Trends',
        data: Object.values(bookmarkTrends),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">📈 Analytics Dashboard</h2>

      {Object.keys(departmentStats).length === 0 ? (
        <p>Loading analytics...</p>
      ) : (
        <>
          <h4>📊 Average Rating per Department</h4>
          <Bar data={ratingBarData} options={{ ...options, title: { text: 'Average Ratings' } }} className="mb-5" />

          <h4>📌 Bookmark Trends (Mocked)</h4>
          <Bar data={bookmarkTrendData} options={{ ...options, title: { text: 'Bookmark Trends' } }} />
        </>
      )}
    </div>
  );
}
