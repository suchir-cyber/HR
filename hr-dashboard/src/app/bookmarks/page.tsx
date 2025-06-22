'use client';
import { useBookmarksStore } from '../../store/bookmarkStore';
import RatingStars from '../../components/RatingStars';
import { useState } from 'react';

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarksStore();
  const [message, setMessage] = useState('');

  const handleAction = (type, name) => {
    setMessage(`${name} has been ${type}ed successfully.`);
    setTimeout(() => setMessage(''), 2500);
  };

  return (
    <div className="container py-4">
      <h2>📌 Bookmarked Employees</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {bookmarks.length === 0 ? (
        <p className="text-muted">No employees bookmarked yet.</p>
      ) : (
        <div className="row">
          {bookmarks.map(user => (
            <div className="col-md-4 mb-3" key={user.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>{user.firstName} {user.lastName}</h5>
                  <p>{user.email}</p>
                  <RatingStars rating={user.rating} />
                  <div className="mt-2 d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleAction('promot', user.firstName)}>Promote</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleAction('assign', user.firstName)}>Assign</button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeBookmark(user.id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
