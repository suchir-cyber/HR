import { create } from 'zustand';

export const useBookmarksStore = create((set) => ({
  bookmarks: [],
  addBookmark: (user) => set(state => ({
    bookmarks: state.bookmarks.find(u => u.id === user.id) ? state.bookmarks : [...state.bookmarks, user]
  })),
  removeBookmark: (id) => set(state => ({
    bookmarks: state.bookmarks.filter(u => u.id !== id)
  }))
}));