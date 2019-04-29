import React, { Component } from 'react';
import {
  Text,
  Button,
  Icon,
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Title,
  H1,
  Card,
  CardItem,
} from 'native-base';
import axios from 'axios';
// interfaces
import Navigation from '../../interfaces/navigation';
import Post from '../../interfaces/post';
import PostComment from '../../interfaces/post-comment';
import ReduxModel from '../../interfaces/redux-model';
import { PostsState } from '../../redux/posts/reducer';
// components
import PostComments from './components/post-comments';
// styles
import styles from './styles';
import { connect } from 'react-redux';
// actions
import postActions from '../../redux/posts/actions';

interface Props {
  navigation?: Navigation;
  posts: PostsState;
  toggleFavoritePost: (post: Post) => void;
}

interface State {
  post: Post;
  loadingComments: boolean;
  comments: PostComment[];
  isFavorite: boolean;
}

class PostDetailsScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: Props) {
    super(props);
    const post = props.navigation && props.navigation.getParam('post');
    this.state = {
      isFavorite: post.isFavorite,
      post: post || {},
      loadingComments: true,
      comments: [],
    };
    console.log('Was this constructed again', this.state.isFavorite);
  }

  componentDidMount(): void {
    this.fetchComments();
  }

  fetchComments = async (): void => {
    const { post } = this.state;
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
    );
    this.setState({ comments: data, loadingComments: false });
  };

  toggleFavorite = (): void => {
    const { isFavorite, post } = this.state;

    this.setState({ isFavorite: !isFavorite });

    this.props.toggleFavoritePost(post);
  };

  render(): JSX.Element {
    const { comments, loadingComments, post, isFavorite } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={(): void => navigation && navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Post details</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.toggleFavorite}>
              <Icon name={`star${!isFavorite ? '-outline' : ''}`} />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem header>
              <H1>{post.title}</H1>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.body}>{post.body}</Text>
              </Body>
            </CardItem>
          </Card>
          <PostComments loading={loadingComments} comments={comments} />
        </Content>
      </Container>
    );
  }
}

export default connect(
  (state: ReduxModel): object => ({
    posts: state.posts,
  }),
  (dispatch): object => ({
    setFavorites: (favorites: number[]): void => dispatch(postActions.setFavorites(favorites)),
    toggleFavoritePost: (post: Post): void => dispatch(postActions.toggleFavoritePost(post)),
  }),
)(PostDetailsScreen);
