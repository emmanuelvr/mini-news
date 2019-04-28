import React from 'react';
import { ListItem, Text } from 'native-base';
// interfaces
import Post from '../interfaces/post';
import NotReadIndicator from './not-read-indicator';
import { withNavigation } from 'react-navigation';
import Navigation from '../interfaces/navigation';

interface Props {
  post: Post;
  navigation?: Navigation;
}

const PostListItem = (props: Props): JSX.Element => {
  const { post, navigation } = props;
  return (
    <ListItem onPress={(): void => navigation && navigation.navigate('Post', { post })}>
      {!post.read && <NotReadIndicator />}
      <Text>{post.title}</Text>
    </ListItem>
  );
};

export default withNavigation(PostListItem);
