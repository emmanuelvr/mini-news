interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  read?: boolean;
  isFavorite: boolean;
}

export default Post;
