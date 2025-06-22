'use client';
import { useRouter } from 'next/navigation';
import UserCard from '../components/UserCard';
import { mockUsers } from '../utils/mockUtils';

export default function HomePage() {
  const router = useRouter();
  const handleView = (id) => router.push(`/employee/${id}`);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🏠 Employee Directory</h2>
      <div className="row">
        {mockUsers.map(user => (
          <div className="col-md-4 mb-3" key={user.id}>
            <UserCard user={user} onView={handleView} />
          </div>
        ))}
      </div>
    </div>
  );
}