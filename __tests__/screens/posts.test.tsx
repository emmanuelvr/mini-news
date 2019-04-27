import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import PostsScreen from '../../src/screens/posts';

it('renders correctly', (): void => {
  renderer.create(<PostsScreen />);
});
