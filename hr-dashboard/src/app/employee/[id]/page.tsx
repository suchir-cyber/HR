'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RatingStars from '../../../components/RatingStars';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        const enriched = {
          ...data,
          department: data.company?.department || 'N/A',
          rating: Math.floor((data.age % 5) + 1),
        };
        setUser(enriched);

        const mockHistory = Array.from({ length: 5 }, (_, i) => ({
          year: 2023 - i,
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        setHistory(mockHistory);
      });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2>{user.firstName} {user.lastName}</h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>Feedback</button>
        </li>
      </ul>

      {activeTab === 'overview' && (
        <>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address?.address}, {user.address?.city}</p>
          <p>Bio: Energetic team player passionate about tech & innovation</p>
          <p>Department: <span className="badge bg-secondary">{user.department}</span></p>
          <RatingStars rating={user.rating} />

          <div className="mt-4">
            <h5>📈 Past Performance History</h5>
            <ul className="list-group">
              {history.map((entry, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                  {entry.year}
                  <span className="badge bg-info">{entry.rating} ⭐</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {activeTab === 'projects' && (
        <div>
          <p>No project assigned yet. This is mock data for now.</p>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div>
          <p>No feedback available. This is mock data for now.</p>
        </div>
      )}
    </div>
  );
}