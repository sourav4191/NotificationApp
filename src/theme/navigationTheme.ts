import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#1a1a1a',
    border: '#dddddd',
    notification: '#007AFF',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0A84FF',
    background: '#000000',
    card: '#1c1c1e',
    text: '#ffffff',
    border: '#383838',
    notification: '#0A84FF',
  },
};
