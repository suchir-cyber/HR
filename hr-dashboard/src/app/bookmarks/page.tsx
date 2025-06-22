'use client';
import { useBookmarksStore } from '../../store/bookmarkStore';
import RatingStars from '../../components/RatingStars';
import { useState } from 'react';

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarksStore();
  const [currentPage, setCurrentPage] = useState(1);
  const bookmarksPerPage = 12;

  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  const currentBookmarks = bookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark);
  const totalPages = Math.ceil(bookmarks.length / bookmarksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePromote = (user) => alert(`${user.firstName} has been promoted!`);
  const handleAssign = (user) => alert(`${user.firstName} has been assigned to a new project!`);

  return (
    <div className="container py-4">
      <h2>📌 Bookmarked Employees</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarked employees.</p>
      ) : (
        <>
          <div className="row">
            {currentBookmarks.map(user => (
              <div className="col-md-4 mb-3" key={user.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>{user.firstName} {user.lastName}</h5>
                    <p>{user.email}</p>
                    <RatingStars rating={user.rating} />
                    <div className="mt-2 d-flex gap-2">
                      <button className="btn btn-success btn-sm" onClick={() => handlePromote(user)}>Promote</button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleAssign(user)}>Assign</button>
                      <button className="btn btn-danger btn-sm" onClick={() => removeBookmark(user.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav>
            <ul className="pagination justify-content-center">
              {[...Array(totalPages).keys()].map(page => (
                <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(page + 1)} className="page-link">
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}