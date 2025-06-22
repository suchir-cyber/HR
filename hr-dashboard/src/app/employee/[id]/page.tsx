'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RatingStars from '../../../components/RatingStars';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Bio: Enthusiastic and detail-oriented team member</p>
      <p>Department: <span className="badge bg-secondary">{user.company?.department || 'N/A'}</span></p>
      <RatingStars rating={Math.round((user.age % 5) + 1)} />
    </div>
  );
}