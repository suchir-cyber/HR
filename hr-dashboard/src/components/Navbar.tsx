'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link className="navbar-brand" href="/">HR Dashboard</Link>
        <div className="d-flex gap-3">
          <Link className="btn btn-outline-primary btn-sm" href="/bookmarks">Bookmarks</Link>
          <Link className="btn btn-outline-success btn-sm" href="/analytics">Analytics</Link>
          <button className="btn btn-sm btn-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}
