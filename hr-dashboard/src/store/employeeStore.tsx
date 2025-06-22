import { create } from 'zustand';

export const useEmployeeStore = create((set) => ({
  employees: [],
  setEmployees: (newEmployees) => set({ employees: newEmployees }),
}));