import { FC } from 'react';
import { Post } from '../../../utils/types/interfaces/state.interface';
import Box from '../../../components/common/Box/Box.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { Wrapper } from './postBox.styles';

interface PostBoxProps {
  post: Post;
}

const PostBox: FC<PostBoxProps> = ({ post }) => {
  return (
    <Wrapper>
      <Box display="grid" gridTemplateColumns="1fr auto" padding="2rem 3.2rem">
        <Box width="6rem" height="6rem" borderRadius="8px" marginBottom="1rem">
          <img src={post.images[0]} alt="Kids Items" />
        </Box>
        <Button buttonType={ButtonType.Trade}>Trade</Button>
        <Box gridColumn="1 / -1">
          <h2>{post.title}</h2>
          <p>Conversation with {post.userName}</p>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default PostBox;
