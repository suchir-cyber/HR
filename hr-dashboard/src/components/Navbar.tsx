import Link from 'next/link';


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">HR Dashboard</Link>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">🏠 Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bookmarks">📌 Bookmarks</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/analytics">📊 Analytics</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
