import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from 'react-native';

test('button calls onPress', () => {
  const mock = jest.fn();
  const {getByText} = render(<Button title="Press" onPress={mock} />);
  fireEvent.press(getByText('Press'));
  expect(mock).toHaveBeenCalled();
});
