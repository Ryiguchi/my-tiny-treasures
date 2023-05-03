import { Post } from '../../utils/interfaces';

import * as S from './PostCardMed.styles';

interface PostCardMedProps {
  post: Post;
  goToChat: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  goToPost: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PostCardMed: React.FC<PostCardMedProps> = ({
  post,
  goToChat,
  goToPost,
}) => {
  return (
    <S.PostContainer>
      <div>USER: {post.user}</div>
      <p>{post.description}</p>
      <button onClick={goToPost} data-item={post._id}>
        View Post
      </button>
      <button onClick={goToChat} data-user={post.title}>
        Send Message
      </button>
    </S.PostContainer>
  );
};

export default PostCardMed;
