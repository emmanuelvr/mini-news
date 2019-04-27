import { POSTS_SET } from '../constants';

function setPosts(data: {}): Function {
  return (dispatch: Function): void => {
    dispatch({
      type: POSTS_SET,
      payload: data,
    });
  };
}

export default {
  setPosts,
};
