import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/features/user/user.selectors';
import { socket } from '../../socket';
import { useInfinitePosts } from '../../utils/hooks';
import PostCardMed from '../../components/PostCardMed/PostCardMed.component';
import * as S from './Home.styles';
import { useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const LoadMoreButton = useRef<HTMLButtonElement>(null);
  const user = useSelector(selectUser);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfinitePosts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log('OBSERVED');
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
      {<h1>{status}</h1>}
      <S.PostListContainer>
        {status === 'loading' ? (
          <p>...loading</p>
        ) : status === 'error' ? (
          <p>Error</p>
        ) : (
          data.pages.map(data => {
            return data.posts.map((post, i, arr) => (
              <div key={post._id}>
                <PostCardMed
                  post={post}
                  goToPost={goToPost}
                  goToChat={goToChat}
                />
              </div>
            ));
          })
        )}
        <button
          ref={LoadMoreButton}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More Results'
            : 'No more posts!'}
        </button>
      </S.PostListContainer>
    </>
  );
};

export default Home;
