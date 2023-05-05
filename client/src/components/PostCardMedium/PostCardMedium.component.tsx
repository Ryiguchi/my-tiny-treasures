import { useNavigate } from 'react-router-dom';
import { Post } from '../../utils/interfaces';
import Box from '../common/Box/Box.component';
import * as S from './postCardMedium.styles';
import { theme } from '../../styles/themes';

interface PostCardMediumProps {
  post: Post;
}

const PostCardMedium: React.FC<PostCardMediumProps> = ({ post }) => {
  const navigate = useNavigate();

  const gridTempCol = post.images.length === 1 ? '1fr' : '1fr 1fr';

  const goToPost = (e: React.MouseEvent<HTMLDivElement>): void => {
    const itemId = e.currentTarget.dataset.item;
    navigate(`/posts/${itemId}`);
  };

  return (
    <S.BoxWithChildren
      cursor="pointer"
      onClick={goToPost}
      backgroundColor="#fff"
      padding=".8rem"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
    >
      <Box display="grid" gridTemplateColumns={gridTempCol} gap=".3rem">
        {post.images.map((img, i) => {
          if (i < 4)
            return (
              <S.ImageBox key={img}>
                <img src={img} alt="Picture" />
              </S.ImageBox>
            );
        })}
      </Box>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </S.BoxWithChildren>
  );
};

export default PostCardMedium;
