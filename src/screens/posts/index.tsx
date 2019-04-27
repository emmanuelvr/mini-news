/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
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
// interfaces
import Navigation from '../../interfaces/navigation';
// components
import DeletePostsFooter from './components/delete-posts-footer';

interface Props {
  navigation?: Navigation;
}

interface State {
  listData: string[];
  showFavorites: boolean;
  favorites: [];
}

class PostsScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      showFavorites: false,
      listData: [],
      favorites: [],
    };
  }

  render(): React.ReactNode {
    const { showFavorites } = this.state;
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
          <Right />
        </Header>
        <Content>
          <Text>Items goes here</Text>
        </Content>
        <DeletePostsFooter />
      </Container>
    );
  }
}

export default PostsScreen;
