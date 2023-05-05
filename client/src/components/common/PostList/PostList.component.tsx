import { FC } from 'react';
import PostCardMedium from '../../PostCardMedium/PostCardMedium.component';
import { Post } from '../../../utils/interfaces';
import Box from '../Box/Box.component';

interface PostListProps {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" padding="2rem" gap="2rem">
      {posts.map(post => (
        <PostCardMedium key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default PostList;
