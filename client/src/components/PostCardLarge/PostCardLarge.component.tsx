import { theme } from '../../styles/themes';
import { getDate } from '../../utils/helpers';
import Box from '../common/Box/Box.component';
import LightBox from '../common/LightBox/LightBox.component';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import * as S from './postCardLarge.styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { updateUserAsync } from '../../store/features/user/userSlice';
import { Post } from '../../utils/types/interfaces/state.interface';

interface PostCardLargeProps {
  post: Post;
}

const PostCardLarge: React.FC<PostCardLargeProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { title, description, itemCount, age, condition, id } = post;
  const user = useSelector(selectUser);

  const toggleSavedPost = (): void => {
    const updatedSavedPosts = updateSavedPosts();
    if (!updatedSavedPosts) return;
    dispatch(updateUserAsync({ newData: updatedSavedPosts, field: 'saved' }));
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
    <S.Wrapper padding="0 1rem" alignItems="center">
      <LightBox images={post.images} />
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        marginTop="1.6rem"
        marginBottom="5rem"
        columnGap="4rem"
        rowGap=".2rem"
        width="100%"
      >
        <p>Date: {getDate(post.createdAt)}</p>
        <p>Location: {post.location.city}</p>
        <p>Condition: {condition}</p>
        <p>Distance: {post.distance}km</p>
        <p>Sizes: {post.sizes}</p>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        gap="2rem"
        marginBottom="1rem"
        width="100%"
      >
        <h1>{title}</h1>
        {user && user.saved.includes(id) ? (
          <Box width="4rem">
            <IoIosHeart
              onClick={toggleSavedPost}
              size={36}
              color={theme.color.primaryBlue}
            />
          </Box>
        ) : (
          <Box width="4rem">
            <IoIosHeartEmpty
              onClick={toggleSavedPost}
              size={36}
              color={theme.color.primaryBlue}
            />
          </Box>
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
    </S.Wrapper>
  );
};

export default PostCardLarge;
