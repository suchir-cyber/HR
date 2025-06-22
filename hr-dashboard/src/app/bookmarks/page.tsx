'use client';
import { useBookmarksStore } from '../../store/bookmarkStore';
import RatingStars from '../../components/RatingStars';

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarksStore();

  return (
    <div className="container py-4">
      <h2>📌 Bookmarked Employees</h2>
      <div className="row">
        {bookmarks.map(user => (
          <div className="col-md-4 mb-3" key={user.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5>{user.firstName} {user.lastName}</h5>
                <p>{user.email}</p>
                <RatingStars rating={user.rating} />
                <div className="mt-2 d-flex gap-2">
                  <button className="btn btn-success btn-sm">Promote</button>
                  <button className="btn btn-primary btn-sm">Assign</button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeBookmark(user.id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}