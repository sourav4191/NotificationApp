import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = {
  route: RouteProp<RootStackParamList, 'Notification'>;
};

const NotificationScreen = ({route}: Props) => {
  const payload = route.params?.payload;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Payload</Text>
      <Text style={styles.json}>{JSON.stringify(payload, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
  json: {
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
});

export default NotificationScreen;
