import React from 'react';
import { Button, Footer, FooterTab, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// interfaces
import Post from '../../../interfaces/post';
// actions
import postActions from '../../../redux/posts/actions';

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

interface Props {
  showFavorites: boolean;
  setPosts?: (posts: Post[]) => void;
  setFavorites?: (posts: Post[]) => void;
  setFavoritesIds?: (ids: number[]) => void;
}

function DeletePostsFooter(props: Props): JSX.Element {
  const { showFavorites, setFavorites, setPosts, setFavoritesIds } = props;

  const cleanFavorites = (): void => {
    setFavorites && setFavorites([]);
    setFavoritesIds && setFavoritesIds([]);
  };

  const handleDelete = showFavorites ? cleanFavorites : setPosts;

  return (
    <Footer>
      <FooterTab>
        <Button full danger onPress={(): void => handleDelete && handleDelete([])}>
          <Text style={styles.buttonText}>DELETE ALL {showFavorites ? 'FAVORITES' : 'POSTS'}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

export default connect(
  null,
  (dispatch): any => ({
    setPosts: (posts: Post[]): void => dispatch(postActions.setPosts(posts)),
    setFavorites: (posts: Post[]): void => dispatch(postActions.setFavorites(posts)),
    setFavoritesIds: (ids: number[]): void => dispatch(postActions.setFavoritesIds(ids)),
  }),
)(DeletePostsFooter);
