'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link href="/" className="navbar-brand">HR Dashboard</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link href="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/bookmarks" className="nav-link">Bookmarks</Link>
          </li>
          <li className="nav-item">
            <Link href="/analytics" className="nav-link">Analytics</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}