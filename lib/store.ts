import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, CallSettings, Integration, KnowledgeItem } from '@/types';

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // UI
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  loading: boolean;
  
  // Data
  knowledgeBase: KnowledgeItem[];
  integrations: Integration[];
  callSettings: CallSettings;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setKnowledgeBase: (knowledge: KnowledgeItem[]) => void;
  setIntegrations: (integrations: Integration[]) => void;
  setCallSettings: (settings: CallSettings) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        isAuthenticated: false,
        theme: 'light',
        sidebarOpen: false,
        loading: false,
        knowledgeBase: [],
        integrations: [],
        callSettings: {
          doNotDisturb: {
            enabled: false,
            startTime: '22:00',
            endTime: '08:00',
          },
          phoneNumbers: [],
          maxConcurrentCalls: 5,
        },

        // Actions
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setTheme: (theme) => set({ theme }),
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        setLoading: (loading) => set({ loading }),
        setKnowledgeBase: (knowledgeBase) => set({ knowledgeBase }),
        setIntegrations: (integrations) => set({ integrations }),
        setCallSettings: (callSettings) => set({ callSettings }),
        logout: () => set({
          user: null,
          token: null,
          isAuthenticated: false,
          knowledgeBase: [],
          integrations: [],
        }),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          theme: state.theme,
          callSettings: state.callSettings,
        }),
      }
    )
  )
);

// Селекторы для оптимизации
export const useUser = () => useAppStore((state) => state.user);
export const useToken = () => useAppStore((state) => state.token);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useTheme = () => useAppStore((state) => state.theme);
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen);
export const useLoading = () => useAppStore((state) => state.loading);
export const useKnowledgeBase = () => useAppStore((state) => state.knowledgeBase);
export const useIntegrations = () => useAppStore((state) => state.integrations);
export const useCallSettings = () => useAppStore((state) => state.callSettings); 