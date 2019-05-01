import React from 'react';
import { ListItem, Text, Icon } from 'native-base';
// interfaces
import Post from '../interfaces/post';
import UnreadIndicator from './unread-indicator';
import { withNavigation } from 'react-navigation';
import Navigation from '../interfaces/navigation';
// styles
import commonColor from '../../theme/variables/commonColor';

interface Props {
  post: Post;
  navigation?: Navigation;
  onPress?: (post: Post) => void;
}

const PostListItem = (props: Props): JSX.Element => {
  const { post, navigation, onPress } = props;
  return (
    <ListItem
      onPress={(): void => {
        navigation && navigation.navigate('Post', { post });
        onPress && onPress(post);
      }}
      style={{ paddingHorizontal: 10 }}
    >
      {!post.read && <UnreadIndicator />}
      {post.isFavorite && (
        <Icon
          name="star"
          style={{ color: commonColor.brandWarning, fontSize: 24, marginRight: 5 }}
        />
      )}
      <Text>{post.title}</Text>
    </ListItem>
  );
};

export default withNavigation(PostListItem);
