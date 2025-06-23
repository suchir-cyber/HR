'use client';
import { useEffect } from 'react';
import { useEmployeeStore } from '../store/employeeStore';

export default function useInitEmployees() {
  const { employees, setEmployees } = useEmployeeStore();

  useEffect(() => {
    if (employees.length > 0) return;

    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const enriched = data.users.map(user => ({
          ...user,
          rating: +(Math.random() * 5).toFixed(2), // mock rating
        }));
        setEmployees(enriched);
      })
      .catch(err => console.error('Failed to fetch employees:', err));
  }, [employees, setEmployees]);
}
