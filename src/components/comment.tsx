import React from 'react';
import { View } from 'react-native';
import { Text, Card, CardItem, Body } from 'native-base';
// interfaces
import PostComment from '../interfaces/post-comment';

interface Props {
  comment: PostComment;
}

const Comment = (props: Props): JSX.Element => {
  const { comment } = props;
  return (
    <Card>
      <CardItem>
        <Body>
          <Text>{comment.body}</Text>
        </Body>
      </CardItem>
      <CardItem footer>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{comment.name}</Text>
      </CardItem>
    </Card>
  );
};

export default Comment;
