'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserCard from '../components/UserCard';

export default function HomePage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const handleView = (id) => router.push(`/employee/${id}`);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🏠 Employee Directory</h2>
      <div className="row">
        {users.map(user => (
          <div className="col-md-4 mb-3" key={user.id}>
            <UserCard user={user} onView={handleView} />
          </div>
        ))}
      </div>
    </div>
  );
}