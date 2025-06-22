import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingStars from '../components/Ratings';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      const mockUser = {
        ...data,
        department: 'Engineering',
        rating: Math.floor(Math.random() * 5) + 1,
        bio: 'A passionate and detail-oriented team member who consistently exceeds expectations.',
        history: Array.from({ length: 5 }, (_, i) => `Project ${i + 1}: ${['Excellent', 'Good', 'Average'][Math.floor(Math.random() * 3)]}`)
      };
      setUser(mockUser);
    };
    fetchUser();
  }, [id]);

  if (!user) return <p className="text-center mt-4">Loading profile...</p>;

  return (
    <div className="container py-4">
      <h2>{user.firstName} {user.lastName} <span className="badge bg-info">{user.department}</span></h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address?.address}, {user.address?.city}</p>
      <RatingStars rating={user.rating} />

      <ul className="nav nav-tabs mt-4">
        {['overview', 'projects', 'feedback'].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content p-3 border border-top-0">
        {activeTab === 'overview' && (
          <div>
            <h5>Bio</h5>
            <p>{user.bio}</p>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h5>Performance History</h5>
            <ul>
              {user.history.map((entry, i) => <li key={i}>{entry}</li>)}
            </ul>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div>
            <h5>Manager Feedback</h5>
            <p>"{['Great team player.', 'Needs to improve deadlines.', 'Outstanding leadership skills.'][Math.floor(Math.random() * 3)]}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
