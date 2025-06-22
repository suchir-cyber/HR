'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserCard from '../../../components/UserCard';
import { useEmployeeStore } from '../../../store/employeeStore';

export default function HomePage() {
  const router = useRouter();
  const employees = useEmployeeStore((state) => state.employees);
  const setEmployees = useEmployeeStore((state) => state.setEmployees);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        setEmployees(data.users);
      });
  }, [setEmployees]);

  const handleView = (id) => router.push(`/employee/${id}`);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🏠 Employee Directory</h2>
      {!employees.length ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {employees.map(user => (
            <div className="col-md-4 mb-3" key={user.id}>
              <UserCard user={user} onView={handleView} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
