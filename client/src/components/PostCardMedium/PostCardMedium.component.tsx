import { Post } from '../../utils/interfaces';

import * as S from './PostCardMedium.styles';

interface PostCardMediumProps {
  post: Post;
  goToChat: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  goToPost: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PostCardMedium: React.FC<PostCardMediumProps> = ({
  post,
  goToChat,
  goToPost,
}) => {
  return (
    <S.PostContainer>
      <div>USER: {post.user}</div>
      <h2>{post.title}</h2>
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

export default PostCardMedium;
