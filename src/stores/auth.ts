import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  role: 'USER' | 'ADMIN'
  verified: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  otpSent: boolean
  otpEmail: string | null
}

interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setOTPSent: (sent: boolean, email?: string) => void
  login: (user: User) => void  // Changed: removed token parameter
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,
      otpEmail: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setOTPSent: (otpSent, email) => set({ otpSent, otpEmail: email || null }),
      
      login: (user) => set({  // Changed: only needs user now
        user,
        isAuthenticated: true,
        isLoading: false,
        otpSent: false,
        otpEmail: null,
      }),
      
      logout: async () => {
        // Call logout API to clear cookie
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
          })
        } catch (error) {
          console.error('Logout error:', error)
        }
        
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          otpSent: false,
          otpEmail: null,
        })
      },
      
      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)