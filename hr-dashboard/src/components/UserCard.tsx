import RatingStars from './Ratings';
import { useBookmarksStore } from '../store/bookmarkStore';

export default function UserCard({ user, onView }) {
  const addBookmark = useBookmarksStore(state => state.addBookmark);
  const bookmarks = useBookmarksStore(state => state.bookmarks);
  const isBookmarked = bookmarks.some(u => u.id === user.id);

  return (
    <div className="card h-100 shadow-sm border-{isBookmarked ? 'success' : 'light'}">
      <div className="card-body">
        <h5 className="card-title">{user.firstName} {user.lastName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
        <p className="card-text">
          Age: {user.age} <br />
          Department: <span className="badge bg-secondary">{user.department}</span>
        </p>
        <RatingStars rating={user.rating} />
        <div className="mt-3 d-flex gap-2">
          <button onClick={() => onView(user.id)} className="btn btn-primary btn-sm">View</button>
          <button
            onClick={() => addBookmark(user)}
            className={`btn btn-sm ${isBookmarked ? 'btn-outline-warning' : 'btn-warning'}`}
            disabled={isBookmarked}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button className="btn btn-success btn-sm">Promote</button>
        </div>
      </div>
    </div>
  );
}