import React, {createContext, useContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  userTheme: Theme;
  toggleTheme: () => void;
  setUserTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  userTheme: 'system',
  toggleTheme: () => {},
  setUserTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [userTheme, setUserTheme] = useState<Theme>('system');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('userTheme');
      if (saved) setUserTheme(saved as Theme);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const applyTheme = async () => {
      await AsyncStorage.setItem('userTheme', userTheme);

      if (userTheme === 'system') {
        const systemTheme = Appearance.getColorScheme() || 'light';
        setTheme(systemTheme);
      } else {
        setTheme(userTheme);
      }
    };
    applyTheme();
  }, [userTheme]);

  useEffect(() => {
    if (userTheme === 'system') {
      const listener = ({colorScheme}: any) => {
        setTheme(colorScheme || 'light');
      };
      const subscription = Appearance.addChangeListener(listener);
      return () => subscription.remove();
    }
  }, [userTheme]);

  const toggleTheme = () => {
    setUserTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{theme, userTheme, toggleTheme, setUserTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
