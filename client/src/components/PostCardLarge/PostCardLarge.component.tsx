import { theme } from '../../styles/themes';
import { getDate } from '../../utils/helpers';
import Box from '../common/Box/Box.component';
import Button from '../common/Button/Button.component';
import { ButtonType } from '../common/Button/button.types';
import LightBox from '../common/LightBox/LightBox.component';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import * as S from './postCardLarge.styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { updateUserAsync } from '../../store/features/user/userSlice';
import { socket } from '../../utils/socket/socket';
import { Post } from '../../utils/types/interfaces/state.interface';
import { ChatDataEmitJoin } from '../../utils/types/interfaces/chat.interface';

interface PostCardLargeProps {
  post: Post;
}

const PostCardLarge: React.FC<PostCardLargeProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    title,
    description,
    itemCount,
    age,
    condition,
    id,
    user: postUser,
  } = post;
  const user = useSelector(selectUser);

  const toggleSavedPost = (): void => {
    const updatedSavedPosts = updateSavedPosts();
    if (!updatedSavedPosts) return;
    dispatch(updateUserAsync({ newData: updatedSavedPosts, field: 'saved' }));
  };

  const goToChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const chatData = getChatData(e);
    socket.emit('join', chatData);
  };

  // HELPERS
  const getChatData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): ChatDataEmitJoin | null => {
    const recieverId = e.currentTarget.dataset.user;
    if (!user || !recieverId) return null;
    return {
      users: [user.id, recieverId],
      post: id,
    };
  };

  const updateSavedPosts = (): string[] | null => {
    if (!user) return null;
    const newSavedPosts = [...user.saved];
    const index = newSavedPosts.indexOf(id);
    if (index === -1) {
      newSavedPosts.push(id);
    } else {
      newSavedPosts.splice(index, 1);
    }
    return newSavedPosts;
  };

  return (
    <S.Wrapper padding="0 1rem">
      <LightBox images={post.images} />
      <Box flexDirection="row" justifyContent="space-between" marginTop=".6rem">
        <p>Published {getDate(post.createdAt)}</p>
        <p>Location: {post.location.city}</p>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        gap="2rem"
        marginTop="2rem"
        marginBottom="1rem"
      >
        <h1>{title}</h1>
        {user && user.saved.includes(id) ? (
          <IoIosHeart
            onClick={toggleSavedPost}
            size={36}
            color={theme.color.primary}
          />
        ) : (
          <IoIosHeartEmpty
            onClick={toggleSavedPost}
            size={36}
            color={theme.color.primary}
          />
        )}
      </Box>
      <Box
        width="100%"
        backgroundColor="#fff"
        borderRadius={theme.radius.image}
        boxShadow={theme.shadow}
        padding="1.2rem"
        marginBottom="1rem"
      >
        <p>{description}</p>
      </Box>
      <Box gap="1rem" marginBottom="3rem">
        <Box flexDirection="row" justifyContent="space-between">
          <p>Ages: {age}</p>
          {post.size && <p>Size: {post.size}</p>}
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <p>Condition: {condition}</p>
          <p>{itemCount} items</p>
        </Box>
      </Box>
      <Box alignItems="center">
        <Button
          onClick={goToChat}
          data-user={postUser}
          buttonType={ButtonType.Message}
        >
          Message Seller
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default PostCardLarge;
