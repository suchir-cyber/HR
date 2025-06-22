'use client';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { useBookmarksStore } from '../../store/bookmarkStore';

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement);

export default function Analytics() {
  const { bookmarks } = useBookmarksStore();
  const [departmentStats, setDepartmentStats] = useState({});

  useEffect(() => {
    const deptRatings = {};
    bookmarks.forEach(emp => {
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
  }, [bookmarks]);

  const barData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: 'Average Rating by Department',
        data: Object.values(departmentStats),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Bookmark Trends',
        data: [2, 5, 8, bookmarks.length],
        borderColor: 'rgba(255, 99, 132, 0.6)',
        fill: false
      }
    ]
  };

  return (
    <div className="container py-4">
      <h2>📊 Analytics</h2>
      <div className="mb-5">
        <h5>Department-wise Average Ratings</h5>
        <Bar data={barData} />
      </div>
      <div>
        <h5>Bookmark Trends</h5>
        <Line data={lineData} />
      </div>
    </div>
  );
}