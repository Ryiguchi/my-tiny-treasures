import { useNavigate } from 'react-router-dom';
import Box from '../common/Box/Box.component';
import * as S from './postCardMedium.styles';
import { theme } from '../../styles/themes';
import { getDate } from '../../utils/helpers';
import { Post } from '../../utils/types/interfaces/state.interface';

interface PostCardMediumProps {
  post: Post;
}

const PostCardMedium: React.FC<PostCardMediumProps> = ({ post }) => {
  const navigate = useNavigate();

  const goToPost = (e: React.MouseEvent<HTMLDivElement>): void => {
    const itemId = e.currentTarget.dataset.item;
    navigate(`/posts/${itemId}`);
  };

  // HELPERS

  const getGridTempCol = () => (post.images.length === 1 ? '1fr' : '1fr 1fr');

  return (
    <S.BoxWithChildren
      cursor="pointer"
      onClick={goToPost}
      backgroundColor="#fff"
      padding=".8rem"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
      data-item={post._id}
    >
      <Box display="grid" gridTemplateColumns={getGridTempCol()} gap=".3rem">
        {post.images.map((img: string, i: number) => {
          if (i < 4)
            return (
              <S.ImageBox key={img}>
                <img src={img} alt="Picture" />
              </S.ImageBox>
            );
        })}
      </Box>
      <h2>{post.group}</h2>
      <p>{post.categories}</p>
      <p>{post.sizes}</p>
      <p>{post.age}</p>
      <p>{getDate(post.createdAt)}</p>
      <p>{post.distance}</p>
    </S.BoxWithChildren>
  );
};

export default PostCardMedium;
