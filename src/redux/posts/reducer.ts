/* eslint-disable @typescript-eslint/no-explicit-any */
import { POSTS_SET } from '../constants';
import Post from '../../interfaces/post';

export interface PostsState {
  posts: Post[];
  favorites: Post[];
  readPosts: number[];
}

const initialState = {
  posts: [],
  favorites: [],
  readPosts: [],
};

const postsReducer = (state: {} = initialState, action: { type: string; payload: any }): any => {
  switch (action.type) {
    case POSTS_SET:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
