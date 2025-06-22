import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { generateMockDepartment, generateMockRating } from '../utils/mockUtils';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();
      const enrichedUsers = data.users.map(user => ({
        ...user,
        department: generateMockDepartment(),
        rating: generateMockRating(),
      }));
      setUsers(enrichedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDepartmentFilter = (dept) => {
    setSelectedDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const handleRatingFilter = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email} ${user.department}`
      .toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartments.length === 0 || selectedDepartments.includes(user.department);
    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(user.rating);
    return matchesSearch && matchesDepartment && matchesRating;
  });

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Employee Dashboard</h1>

      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label fw-bold">Filter by Department</label>
          {['Engineering', 'HR', 'Marketing', 'Sales'].map(dept => (
            <div className="form-check" key={dept}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedDepartments.includes(dept)}
                onChange={() => handleDepartmentFilter(dept)}
                id={dept}
              />
              <label className="form-check-label" htmlFor={dept}>{dept}</label>
            </div>
          ))}
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label fw-bold">Filter by Rating</label>
          {[1, 2, 3, 4, 5].map(rating => (
            <div className="form-check" key={rating}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingFilter(rating)}
                id={`rating-${rating}`}
              />
              <label className="form-check-label" htmlFor={`rating-${rating}`}>{rating} Star</label>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="row">
          {filteredUsers.map(user => (
            <div className="col-md-4 mb-4" key={user.id}>
              <UserCard user={user} onView={(id) => navigate(`/employee/${id}`)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}