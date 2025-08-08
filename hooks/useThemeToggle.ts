import { useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export function useThemeToggle() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마 모드 불러오기
    if (typeof window !== 'undefined') {
      const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode;
      if (savedThemeMode) {
        setThemeMode(savedThemeMode);
      }
      setIsInitialized(true);
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  };

  const getCurrentTheme = (): 'light' | 'dark' => {
    if (themeMode === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    return themeMode;
  };

  return {
    themeMode,
    setTheme,
    getCurrentTheme,
    isInitialized,
  };
} 