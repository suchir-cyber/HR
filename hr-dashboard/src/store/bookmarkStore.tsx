import { create } from 'zustand';

export const useBookmarksStore = create((set) => ({
  bookmarks: [],
  addBookmark: (user) =>
    set((state) => {
      const alreadyBookmarked = state.bookmarks.some((u) => u.id === user.id);
      if (alreadyBookmarked) return state;
      return { bookmarks: [...state.bookmarks, user] };
    }),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((u) => u.id !== id),
    })),
}));