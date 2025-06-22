'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useBookmarksStore } from '../../store/bookmarkStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const { bookmarks } = useBookmarksStore();
  const [departmentStats, setDepartmentStats] = useState({});

  useEffect(() => {
    const deptRatings = {};
    bookmarks.forEach(emp => {
      const dept = emp.company?.department || 'N/A';
      if (!deptRatings[dept]) deptRatings[dept] = { total: 0, count: 0 };
      deptRatings[dept].total += emp.rating;
      deptRatings[dept].count++;
    });

    const avgRatings = {};
    Object.keys(deptRatings).forEach(dept => {
      avgRatings[dept] = deptRatings[dept].total / deptRatings[dept].count;
    });
    setDepartmentStats(avgRatings);
  }, [bookmarks]);

  const barData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: 'Average Rating by Department',
        data: Object.values(departmentStats),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2>📊 Analytics</h2>
      <div className="mt-4">
        <Bar data={barData} />
      </div>
    </div>
  );
}