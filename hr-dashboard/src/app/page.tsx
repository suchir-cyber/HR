'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 🔐 Mock credentials check
    if (email === 'suchir.pandula18@gmail.com' && password === 'suchir123') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">🔐 HR Panel Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary w-100" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
