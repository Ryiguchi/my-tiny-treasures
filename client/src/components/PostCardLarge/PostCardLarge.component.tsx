import { Post } from '../../utils/interfaces';

interface PostCardLargeProps {
  post: Post;
}

const PostCardLarge: React.FC<PostCardLargeProps> = ({ post }) => {
  const { title, description, itemCount, user, id } = post;

  return (
    <div>
      <h1>TITLE: {title}</h1>
      <h2>DESC: {description}</h2>
      <h2>COUNT: {itemCount}</h2>
      <h1>USER: {user}</h1>
      <h1>ID: {id}</h1>
    </div>
  );
};

export default PostCardLarge;
