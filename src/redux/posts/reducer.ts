/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  POSTS_SET,
  POSTS_FAVORITES_SET,
  POSTS_FAVORITES_IDS_SET,
  POSTS_FETCHING_SET,
  POSTS_READ_SET,
} from '../constants';
import Post from '../../interfaces/post';

export interface PostsState {
  fetching: boolean;
  posts: Post[];
  favorites: Post[];
  favoritesIds: number[];
  readPosts: number[];
}

const initialState = {
  fetching: false,
  posts: [],
  favorites: [],
  favoritesIds: [],
  readPosts: [],
};

const postsReducer = (state: {} = initialState, action: { type: string; payload: any }): any => {
  switch (action.type) {
    case POSTS_SET:
      return {
        ...state,
        posts: action.payload,
      };

    case POSTS_FAVORITES_SET:
      return {
        ...state,
        favorites: action.payload,
      };

    case POSTS_FAVORITES_IDS_SET:
      return {
        ...state,
        favoritesIds: action.payload,
      };

    case POSTS_FETCHING_SET:
      return {
        ...state,
        fetching: action.payload,
      };

    case POSTS_READ_SET:
      return {
        ...state,
        readPosts: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
