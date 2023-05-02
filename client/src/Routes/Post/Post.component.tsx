import { useParams } from 'react-router-dom';
import { usePost } from '../../utils/hooks';

const Post = () => {
  const postId = useParams().postId;
  const { status, data, error, isFetching } = usePost(postId);
  const post = data?.data.post;

  return (
    <div>
      <h1>TITLE: {post?.title}</h1>
      <h2>DESC: {post?.description}</h2>
      <h2>COUNT: {post?.itemCount}</h2>
      <h1>USER: {post?.user}</h1>
      <h1>ID: {post?.id}</h1>
    </div>
  );
};

export default Post;
