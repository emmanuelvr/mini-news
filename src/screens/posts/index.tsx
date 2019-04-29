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
} from 'native-base';
// actions
import postActions from '../../redux/posts/actions';
// interfaces
import Navigation from '../../interfaces/navigation';
import ReduxModel from '../../interfaces/redux-model';
import Post from '../../interfaces/post';
// components
import DeletePostsFooter from './components/delete-posts-footer';
import PostsList from './components/posts-list';

interface Props {
  navigation?: Navigation;
  posts: {
    posts: [];
    favorites: [];
  };
  fetchPosts: () => void;
  setPosts: (posts: Post[]) => void;
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
      listData: props.posts.posts,
    };
  }

  componentDidMount(): void {
    this.props.fetchPosts();
  }

  deletePost = (post: any, rowId: any): void => {
    const { setPosts } = this.props;
    const { listData } = this.state;
    const newData = [...listData];
    newData.splice(rowId, 1);
    this.setState({ listData: newData });
    setPosts(newData);
  };

  addFavorite = (post: any): void => {
    console.log('Post to fav would be', post);
  };

  render(): JSX.Element {
    const { showFavorites } = this.state;
    const {
      posts: { favorites, posts },
      navigation,
      fetchPosts,
    } = this.props;
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
            <Button transparent onPress={fetchPosts}>
              <Icon name="refresh" />
            </Button>
          </Right>
        </Header>
        <Content>
          <PostsList
            onPressItem={(post: Post): void => navigation && navigation.navigate('Post', { post })}
            onPressLeft={this.addFavorite}
            onPressRight={this.deletePost}
            items={showFavorites ? favorites : posts}
          />
        </Content>
        <DeletePostsFooter />
      </Container>
    );
  }
}

export default connect(
  (state: ReduxModel): any => ({
    posts: state.posts,
  }),
  (dispatch): any => ({
    fetchPosts: (): void => dispatch(postActions.fetchPosts()),
    setPosts: (posts: Post[]): void => dispatch(postActions.setPosts(posts)),
  }),
)(PostsScreen);
