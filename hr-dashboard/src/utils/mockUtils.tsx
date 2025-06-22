const departments = ['Engineering', 'HR', 'Marketing', 'Sales'];

export function generateMockDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

export function generateMockRating() {
  return Math.floor(Math.random() * 5) + 1;
}