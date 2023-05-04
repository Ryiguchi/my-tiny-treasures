import { useParams } from 'react-router-dom';
import { usePost } from '../../utils/hooks';
import PostCardLarge from '../../components/PostCardLarge/PostCardLarge.component';

const Post: React.FC = () => {
  const postId = useParams().postId;
  const { data, isError, error, isLoading } = usePost(postId);

  return (
    <div>
      {isLoading ? (
        <p>loading spinner</p>
      ) : isError ? (
        <p>error message: ${error instanceof Error && error.message}</p>
      ) : (
        data && <PostCardLarge post={data.data.post} />
      )}
    </div>
  );
};

export default Post;
