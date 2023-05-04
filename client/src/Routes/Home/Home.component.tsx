import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/features/user/user.selectors';
import { socket } from '../../socket';
import { useInfinitePosts } from '../../utils/hooks';
import PostCardMedium from '../../components/PostCardMedium/PostCardMedium.component';
import * as S from './home.styles';
import { useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const LoadMoreButton = useRef<HTMLButtonElement>(null);
  const user = useSelector(selectUser);
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (LoadMoreButton.current) {
      observer.observe(LoadMoreButton.current);
    }

    return () => observer.disconnect();
  }, [LoadMoreButton.current]);

  const goToChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (!user) return;

    const receiver = e.currentTarget.dataset.user;
    socket.emit('join', [user.id, receiver]);
  };

  const goToPost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const itemId = e.currentTarget.dataset.item;
    navigate(`/posts/${itemId}`);
  };

  return (
    <>
      <button onClick={() => navigate('/signin')}>LogIn</button>
      {/* <button onClick={getPosts}>Get</button> */}
      <button onClick={() => navigate('/messages')}>Messages</button>
      <S.PostListContainer>
        {data &&
          data.pages.map(data => {
            return data.posts.map((post, i, arr) => (
              <div key={post._id}>
                <PostCardMedium
                  post={post}
                  goToPost={goToPost}
                  goToChat={goToChat}
                />
              </div>
            ));
          })}
        <button
          ref={LoadMoreButton}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage || isLoading
            ? 'Loading more...'
            : isError
            ? 'Error!'
            : 'No more posts!'}
        </button>
        {error instanceof Error && <p> error.message</p>}
      </S.PostListContainer>
    </>
  );
};

export default Home;
