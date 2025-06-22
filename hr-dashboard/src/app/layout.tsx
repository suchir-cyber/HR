import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'HR Dashboard',
  description: 'Track and manage employees',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
