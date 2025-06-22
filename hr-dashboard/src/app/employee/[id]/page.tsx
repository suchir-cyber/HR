'use client';
import { useParams } from 'next/navigation';
import { mockUsers } from '../../../utils/mockUtils';
import RatingStars from '../../../components/RatingStars';

export default function UserDetails() {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === parseInt(id));
  if (!user) return <p>User not found</p>;

  return (
    <div className="container py-4">
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Bio: Enthusiastic and detail-oriented team member</p>
      <p>Department: {user.department}</p>
      <RatingStars rating={user.rating} />
    </div>
  );
}