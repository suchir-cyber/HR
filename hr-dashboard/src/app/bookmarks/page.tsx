import { useBookmarksStore } from '../store/bookmarkStore';
import RatingStars from '../components/Ratings';

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarksStore();

  return (
    <div className="container py-4">
      <h2 className="mb-4">📌 Bookmarked Employees</h2>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="row">
          {bookmarks.map(user => (
            <div className="col-md-4 mb-4" key={user.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                  <p className="card-text">
                    Age: {user.age} <br />
                    Department: <span className="badge bg-secondary">{user.department}</span>
                  </p>
                  <RatingStars rating={user.rating} />
                  <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-success btn-sm">Promote</button>
                    <button className="btn btn-primary btn-sm">Assign to Project</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeBookmark(user.id)}
                    >
                      Remove
                    </button>
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