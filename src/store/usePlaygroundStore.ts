import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlaygroundState {
  activeFeatureId: string | null;
  code: string;
  output: string[];
  isRunning: boolean;
  theme: 'dark' | 'light';
  
  setActiveFeature: (id: string) => void;
  setCode: (code: string) => void;
  addOutput: (message: string) => void;
  clearOutput: () => void;
  setRunning: (isRunning: boolean) => void;
  toggleTheme: () => void;
}

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      activeFeatureId: null,
      code: '',
      output: [],
      isRunning: false,
      theme: 'dark',

      setActiveFeature: (id) => set({ activeFeatureId: id }),
      
      setCode: (code) => set({ code }),
      
      addOutput: (message) => set((state) => ({ 
        output: [...state.output, message] 
      })),
      
      clearOutput: () => set({ output: [] }),
      
      setRunning: (isRunning) => set({ isRunning }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
    }),
    {
      name: 'es6-playground-storage',
      partialize: (state) => ({ 
        activeFeatureId: state.activeFeatureId,
        theme: state.theme,
      }),
    }
  )
);
