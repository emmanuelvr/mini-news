import axios from 'axios';

import { POSTS_SET } from '../constants';
// interfaces
import ReduxModel from '../../interfaces/redux-model';
import Post from '../../interfaces/post';
import { PostsState } from './reducer';

function setPosts(data: {}): any {
  return (dispatch: Function): void => {
    dispatch({
      type: POSTS_SET,
      payload: data,
    });
  };
}

function filterReadPosts(posts: Post[], postsState: PostsState): Post[] {
  const { readPosts } = postsState;
  const newPosts = posts.map(
    (post: Post, index: number): Post => ({
      ...post,
      read: readPosts.includes(post.id) || index <= 20,
    }),
  );
  return newPosts;
}

function fetchPosts(): any {
  return async (dispatch: Function, getState: Function): void => {
    const state: ReduxModel = getState();
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = filterReadPosts(data, state.posts);
    dispatch(setPosts(posts));
  };
}

export default {
  setPosts,
  fetchPosts,
};
