'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('light'); 

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(!!auth);

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-3`}>
      <Link href="/" className="navbar-brand">HR Dashboard</Link>

      {isAuthenticated && (
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${pathname === '/home' ? 'active' : ''}`}>
              <Link href="/home" className="nav-link">Home</Link>
            </li>
            <li className={`nav-item ${pathname === '/bookmarks' ? 'active' : ''}`}>
              <Link href="/bookmarks" className="nav-link">Bookmarks</Link>
            </li>
            <li className={`nav-item ${pathname === '/analytics' ? 'active' : ''}`}>
              <Link href="/analytics" className="nav-link">Analytics</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}
