import { useParams } from 'react-router-dom';
import PostCardLarge from '../../components/PostCardLarge/PostCardLarge.component';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import Box from '../../components/common/Box/Box.component';
import { usePost } from '../../utils/hooks/reactQueryHooks';
import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import { socket } from '../../utils/socket/socket';
import { ChatDataEmitJoin } from '../../utils/types/interfaces/chat.interface';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';

const Post: React.FC = () => {
  const postId = useParams().postId;
  const user = useSelector(selectUser);

  const { data, isError, error, isLoading } = usePost(postId);

  const goToChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const chatData = getChatData(e);
    socket.emit('get room', chatData);
  };

  // HELPERS
  const getChatData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): ChatDataEmitJoin | null => {
    const recieverId = e.currentTarget.dataset.user;
    if (!user || !recieverId || !postId) return null;
    return {
      users: [user.id, recieverId],
      post: postId,
    };
  };

  return (
    <>
      <GoBackNav title="item" />
      <Box padding="2.4rem" gap="3rem" backgroundColor="##F3F0E6">
        {isLoading || !data ? (
          <p>loading spinner</p>
        ) : isError ? (
          <p>error message: ${error instanceof Error && error.message}</p>
        ) : (
          <>
            <PostCardLarge post={data.data.post[0]} />
            <Box alignItems="center">
              <Button
                onClick={goToChat}
                data-user={data.data.post[0].user}
                buttonType={ButtonType.Primary}
              >
                Message Seller
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Post;
