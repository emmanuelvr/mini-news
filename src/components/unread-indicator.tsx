import React from 'react';
import { View, Text } from 'react-native';
import commonColor from '../../theme/variables/commonColor';

const UnreadIndicator = (): JSX.Element => {
  return (
    <View
      style={{
        height: 15,
        width: 15,
        borderRadius: 15,
        backgroundColor: '#629cf7',
        marginHorizontal: 6,
      }}
    />
  );
};

export default UnreadIndicator;
