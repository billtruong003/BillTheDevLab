'use client';

import { create } from 'zustand';

interface UIState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  lightboxImage: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setLightboxImage: (src: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  lightboxImage: null,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setLightboxImage: (src) => set({ lightboxImage: src }),
}));
