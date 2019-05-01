import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { H2 } from 'native-base';
// interfaces
import PostComment from '../../../interfaces/post-comment';
// styles
import commonColor from '../../../../theme/variables/commonColor';
// components
import Comment from '../../../components/comment';

interface Props {
  comments: PostComment[];
  loading: boolean;
}

function PostComments(props: Props): JSX.Element {
  const { comments, loading } = props;

  if (loading) {
    return <ActivityIndicator size="small" color={commonColor.brandPrimary} />;
  }

  return (
    <View style={{ marginTop: 20 }}>
      <H2 style={{ marginBottom: 10 }}>Comments</H2>
      {comments.map(
        (comment: PostComment): JSX.Element => (
          <Comment key={comment.id} comment={comment} />
        ),
      )}
    </View>
  );
}

export default PostComments;
