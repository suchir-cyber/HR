'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserCard from '../../components/UserCard';

export default function HomePage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const enrichedUsers = data.users.map(user => ({
          ...user,
          department: user.company?.department || 'N/A',
          rating: Math.floor((user.age % 5) + 1),
        }));
        setUsers(enrichedUsers);
        setFilteredUsers(enrichedUsers);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = (
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(user.department);
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(String(user.rating));
      return matchesSearch && matchesDepartment && matchesRating;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, selectedDepartments, selectedRatings, users]);

  const handleView = (id) => router.push(`/employee/${id}`);
  const handlePromote = (user) => alert(`Promote ${user.firstName} to project`);

  const uniqueDepartments = [...new Set(users.map(user => user.department))];
  const uniqueRatings = ['1', '2', '3', '4', '5'];

  return (
    <div className="container py-4">
      <h2 className="mb-4">🏠 Employee Directory</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            multiple
            value={selectedDepartments}
            onChange={(e) =>
              setSelectedDepartments(Array.from(e.target.selectedOptions, option => option.value))
            }
          >
            {uniqueDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            multiple
            value={selectedRatings}
            onChange={(e) =>
              setSelectedRatings(Array.from(e.target.selectedOptions, option => option.value))
            }
          >
            {uniqueRatings.map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {filteredUsers.map(user => (
            <div className="col-md-4 mb-3" key={user.id}>
              <UserCard user={user} onView={handleView} onPromote={handlePromote} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
