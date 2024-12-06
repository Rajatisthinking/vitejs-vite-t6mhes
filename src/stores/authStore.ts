import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, LoginCredentials } from '../types/auth';
import { authenticateUser, validateToken } from '../services/auth/authService';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        try {
          const { user, token } = await authenticateUser(credentials);
          set({
            user,
            token,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      checkAuth: () => {
        const state = get();
        if (!state.token || !state.user) return false;
        
        const isTokenValid = validateToken(state.token);
        if (!isTokenValid) {
          set({ user: null, token: null, isAuthenticated: false });
          return false;
        }

        return true;
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);