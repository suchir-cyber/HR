import { create } from 'zustand';

export const useEmployeeStore = create((set) => ({
  employees: [],
  setEmployees: (data) => set({ employees: data }),
}));