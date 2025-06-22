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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', department: '', age: '', rating: 3 });

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

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.department) {
      alert('Please fill all required fields');
      return;
    }
    const newUser = {
      id: Date.now(),
      ...formData,
      rating: parseInt(formData.rating),
    };
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🏠 Employee Directory</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>+ Create User</button>
      </div>

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

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleCreateUser}>
                <div className="modal-header">
                  <h5 className="modal-title">Create New Employee</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input className="form-control mb-2" placeholder="First Name" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Department" required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                  <input type="number" className="form-control mb-2" placeholder="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                  <select className="form-select" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}