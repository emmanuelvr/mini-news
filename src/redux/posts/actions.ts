/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import {
  POSTS_SET,
  POSTS_FAVORITES_SET,
  POSTS_FAVORITES_IDS_SET,
  POSTS_FETCHING_SET,
  POSTS_READ_SET,
} from '../constants';
// interfaces
import ReduxModel from '../../interfaces/redux-model';
import Post from '../../interfaces/post';

function setPosts(data: {}): any {
  return (dispatch: Function): void => {
    dispatch({
      type: POSTS_SET,
      payload: data,
    });
  };
}

function setFavorites(data: {}): any {
  return (dispatch: Function): void => {
    dispatch({
      type: POSTS_FAVORITES_SET,
      payload: data,
    });
  };
}

function setFavoritesIds(data: {}): any {
  return (dispatch: Function): void => {
    dispatch({
      type: POSTS_FAVORITES_IDS_SET,
      payload: data,
    });
  };
}

function filterPosts(posts: Post[]): Function {
  return (dispatch: Function, getState: Function): void => {
    const {
      posts: { readPosts, favoritesIds },
    }: ReduxModel = getState();

    const favorites: Post[] = [];

    const newPosts = posts.map(
      (post: Post, index: number): Post => {
        const isFavorite = favoritesIds.includes(post.id);
        const newPost = {
          ...post,
          isFavorite,
          read: readPosts.includes(post.id) || index > 19,
        };

        if (isFavorite) favorites.push(newPost);
        return newPost;
      },
    );

    dispatch(setPosts(newPosts));
    dispatch(setFavorites(favorites));
  };
}

function setFetching(fetching: boolean): Function {
  return (dispatch: Function): void => {
    dispatch({
      type: POSTS_FETCHING_SET,
      payload: fetching,
    });
  };
}

function fetchPosts(): any {
  return async (dispatch: Function): void => {
    dispatch(setFetching(true));
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(setFetching(false));
    dispatch(filterPosts(data));
  };
}

function toggleFavoritePost(post: Post): any {
  return (dispatch: Function, getState: Function): void => {
    const {
      posts: { favoritesIds, favorites },
    }: ReduxModel = getState();

    const newFavorites = [...favorites];
    const newFavIds = [...favoritesIds];

    if (!newFavIds.includes(post.id)) {
      newFavIds.push(post.id);
      post.isFavorite = true;
      newFavorites.push(post);
    } else {
      const favIdIndex = newFavIds.findIndex((id): boolean => id === post.id);
      const favoriteIndex = newFavorites.findIndex((p: Post): boolean => p.id === post.id);

      newFavIds.splice(favIdIndex, 1);
      newFavorites.splice(favoriteIndex, 1);
    }

    dispatch(setFavorites(newFavorites));
    dispatch(setFavoritesIds(newFavIds));
    dispatch(fetchPosts());
  };
}

function addRead(postId: number): any {
  return (dispatch: Function, getState: Function): void => {
    const {
      posts: { readPosts },
    }: ReduxModel = getState();
    readPosts.push(postId);
    dispatch({
      type: POSTS_READ_SET,
      payload: readPosts,
    });
  };
}

export default {
  addRead,
  setPosts,
  setFavorites,
  setFavoritesIds,
  fetchPosts,
  toggleFavoritePost,
};
