import {StyleSheet} from 'react-native';
import {useTheme} from './ThemeContext';
import {lightColors, darkColors} from './colors';

export const useThemeStyles = () => {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginVertical: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    input: {
      backgroundColor: colors.input,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      color: colors.text,
      fontSize: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    temp: {
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 4,
      color: colors.text,
    },
    desc: {
      textTransform: 'capitalize',
      color: colors.textSecondary,
      fontSize: 16,
    },
    detail: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    label: {
      marginTop: 8,
      color: colors.textSecondary,
    },
    error: {
      color: '#FF3B30',
      fontWeight: '500',
    },
    hint: {
      color: colors.textSecondary,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    container1: {marginVertical: 10},
    loader: {marginTop: 8},
    list: {maxHeight: 200, marginTop: 5, backgroundColor: colors.card},
    item: {
      padding: 12,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    cityName: {
      fontSize: 15,
      color: colors.text,
    },
    text: {color: colors.text},
    infoCard: {
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 12,
      marginVertical: 20,
      elevation: 3,
    },
    buttonRow: {marginVertical: 8},
  });
};
