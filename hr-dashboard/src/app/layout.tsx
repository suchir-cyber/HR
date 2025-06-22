'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const protectedRoutes = ['/home', '/bookmarks', '/analytics', '/employee'];
    const isProtected = protectedRoutes.some(path => pathname.startsWith(path));

    if (!isAuthenticated && isProtected) {
      router.push('/');
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}