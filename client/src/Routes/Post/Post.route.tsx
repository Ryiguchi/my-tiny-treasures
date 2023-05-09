import { useParams } from 'react-router-dom';
import PostCardLarge from '../../components/PostCardLarge/PostCardLarge.component';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import Box from '../../components/common/Box/Box.component';
import { usePost } from '../../utils/hooks/reactQueryHooks';

const Post: React.FC = () => {
  const postId = useParams().postId;

  const { data, isError, error, isLoading } = usePost(postId);

  return (
    <Box padding=".8rem" gap="3rem" backgroundColor="##F3F0E6">
      <GoBackNav title="item" />
      {isLoading || !data ? (
        <p>loading spinner</p>
      ) : isError ? (
        <p>error message: ${error instanceof Error && error.message}</p>
      ) : (
        <PostCardLarge post={data.data.post[0]} />
      )}
    </Box>
  );
};

export default Post;
