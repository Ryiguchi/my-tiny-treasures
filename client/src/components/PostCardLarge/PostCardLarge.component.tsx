import { theme } from '../../styles/themes';
import { getDate } from '../../utils/helpers';
import { Post } from '../../utils/interfaces';
import Box from '../common/Box/Box.component';
import Button from '../common/Button/Button.component';
import { ButtonType } from '../common/Button/button.types';
import LightBox from '../common/LightBox/LightBox.component';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import * as S from './postCardLarge.styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';
import { useAppDispatch } from '../../utils/hooks';
import { updateUserAsync } from '../../store/features/user/userSlice';
import { socket } from '../../utils/socket';

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

  const toggleSavedPost = () => {
    if (!user) return;
    const newSaved = [...user.saved];
    const index = newSaved.indexOf(id);
    if (index === -1) {
      newSaved.push(id);
    } else {
      newSaved.splice(index, 1);
    }
    dispatch(updateUserAsync({ newData: newSaved, field: 'saved' }));
  };

  const goToChat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user) return;
    const recieverId = e.currentTarget.dataset.user;
    const chatData = {
      users: [user.id, recieverId],
      post: id,
    };
    socket.emit('join', chatData);
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
