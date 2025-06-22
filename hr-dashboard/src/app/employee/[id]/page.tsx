'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RatingStars from '../../../components/RatingStars';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [tab, setTab] = useState('overview');
  const [feedback, setFeedback] = useState({ name: '', message: '', rating: 3 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        const enrichedUser = {
          ...data,
          department: data.company?.department || 'N/A',
          rating: Math.floor((data.age % 5) + 1),
        };
        setEmployee(enrichedUser);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.name.trim() && feedback.message.trim()) {
      console.log('Submitted feedback:', feedback);
      setSubmitted(true);
      setFeedback({ name: '', message: '', rating: 3 });
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2>{employee.firstName} {employee.lastName}</h2>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Address:</strong> {employee.address?.address}, {employee.address?.city}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <RatingStars rating={employee.rating} />

      <ul className="nav nav-tabs mt-4">
        {['overview', 'projects', 'feedback'].map(t => (
          <li className="nav-item" key={t}>
            <button
              className={`nav-link ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        {tab === 'overview' && <p>This is the employee's overview tab with general information.</p>}
        {tab === 'projects' && <p>Project list would be displayed here (mocked).</p>}
        {tab === 'feedback' && (
          <div className="card p-3">
            {submitted && <div className="alert alert-success">Feedback submitted successfully!</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Feedback</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={feedback.rating}
                  onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
