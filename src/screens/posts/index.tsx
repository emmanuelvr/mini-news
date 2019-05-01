/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Right,
  Segment,
  Spinner,
} from 'native-base';
// actions
import postActions from '../../redux/posts/actions';
// interfaces
import Navigation from '../../interfaces/navigation';
import ReduxModel from '../../interfaces/redux-model';
import Post from '../../interfaces/post';
import { PostsState } from '../../redux/posts/reducer';
// components
import DeletePostsFooter from './components/delete-posts-footer';
import PostsList from './components/posts-list';
import { View } from 'react-native';

interface Props {
  navigation?: Navigation;
  posts: PostsState;
  fetchPosts: () => void;
  setPosts: (posts: Post[]) => void;
  toggleFavoritePost: (post: Post) => void;
  addRead: (postId: number) => void;
}

interface State {
  showFavorites: boolean;
}

class PostsScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      showFavorites: false,
    };
  }

  componentDidMount(): void {
    this.props.fetchPosts();
  }

  deletePost = (post: any): void => {
    const {
      setPosts,
      posts: { posts },
    } = this.props;
    const newData = [...posts];
    const postIndex = posts.findIndex((p: Post): boolean => p.id === post.id);
    newData.splice(postIndex, 1);
    setPosts(newData);
  };

  displayPostsStatus = (): JSX.Element => {
    const { showFavorites } = this.state;
    const {
      posts: { fetching },
    } = this.props;

    let content = null;
    if (fetching) {
      content = <Text style={{ textAlign: 'center' }}>Loading posts...</Text>;
    }

    if (showFavorites) {
      content = (
        <React.Fragment>
          <Text>Oops, it seems you don't have any favorite posts yet.</Text>
          <Text
            style={{ color: 'blue', marginTop: 10 }}
            onPress={(): void => this.setState({ showFavorites: false })}
          >
            Tap here to start looking for your next favorite post!
          </Text>
        </React.Fragment>
      );
    } else {
      content = <Text>There are no posts available. Please try again later.</Text>;
    }

    return <View style={{ marginTop: 30, paddingHorizontal: 10 }}>{content}</View>;
  };

  render(): JSX.Element {
    const { showFavorites } = this.state;
    const {
      posts: { favorites, posts, fetching },
      navigation,
      fetchPosts,
      toggleFavoritePost,
      addRead,
    } = this.props;

    const postsToShow = showFavorites ? favorites : posts;

    return (
      <Container>
        <Header hasSegment>
          <Left />
          <Body>
            <Segment>
              <Button
                first
                active={!showFavorites}
                onPress={(): void => this.setState({ showFavorites: false })}
              >
                <Icon name="list" />
                <Text>All posts</Text>
              </Button>
              <Button
                last
                active={showFavorites}
                onPress={(): void => this.setState({ showFavorites: true })}
              >
                <Icon name="star" />
                <Text>Favorites</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
            <Button transparent onPress={fetching ? undefined : fetchPosts}>
              {fetching ? <Spinner color="white" size="small" /> : <Icon name="refresh" />}
            </Button>
          </Right>
        </Header>
        <Content>
          {postsToShow.length ? (
            <PostsList
              onPressItem={(post: Post): void => {
                navigation && navigation.navigate('Post', { post });
                addRead(post.id);
                fetchPosts();
              }}
              onPressLeft={(post: Post): void => toggleFavoritePost(post)}
              onPressRight={this.deletePost}
              items={postsToShow}
            />
          ) : (
            this.displayPostsStatus()
          )}
        </Content>
        <DeletePostsFooter showFavorites={showFavorites} />
      </Container>
    );
  }
}

export default connect(
  (state: ReduxModel): object => ({
    posts: state.posts,
  }),
  (dispatch): object => ({
    fetchPosts: (): void => dispatch(postActions.fetchPosts()),
    setPosts: (posts: Post[]): void => dispatch(postActions.setPosts(posts)),
    toggleFavoritePost: (post: Post): void => dispatch(postActions.toggleFavoritePost(post)),
    addRead: (postId: number): void => dispatch(postActions.addRead(postId)),
  }),
)(PostsScreen);
