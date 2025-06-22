import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'HR Dashboard',
  description: 'Track and manage employees',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
