import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

function PostsScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Posts screen</Text>
    </View>
  );
}

export default PostsScreen;
