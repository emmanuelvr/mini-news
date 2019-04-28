interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  read?: boolean;
}

export default Post;
