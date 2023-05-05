import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/features/user/user.selectors';
import { getPosts } from '../../utils/hooks';
import * as S from './home.styles';
import { useEffect, useRef } from 'react';
import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import Box from '../../components/common/Box/Box.component';
import { fileRefs } from '../../utils/fileRefs';
import PostList from '../../components/common/PostList/PostList.component';
import SelectInput from '../../components/common/select-input/SelectInput.component';
import { clothes } from '../../utils/enums';
import { theme } from '../../styles/themes';
import { useInfiniteQuery } from '@tanstack/react-query';

const Home: React.FC = () => {
  const { startQuery } = useParams();
  const navigate = useNavigate();
  const LoadMoreButton = useRef<HTMLDivElement>(null);
  const user = useSelector(selectUser);
  const [query, setQuery] = useState(startQuery);
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', query],
    queryFn: ({ pageParam }) => getPosts({ pageParam, query }),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.metadata.nextPage;
      const totalPages = lastPage.metadata.totalPages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !!query,
  });

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

  // const goToChat = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   if (!user) return;

  //   const receiver = e.currentTarget.dataset.user;
  //   socket.emit('join', [user.id, receiver]);
  // };

  const buildQuery = (key: string, option: string): void => {
    setQuery(prev => `${startQuery}&${key}=${option}`);
    console.log(query);
  };

  const buttonType =
    isFetchingNextPage || isLoading
      ? ButtonType.Pending
      : !hasNextPage || isFetchingNextPage
      ? ButtonType.Disabled
      : ButtonType.Message;

  return (
    <Box width="100%" gap="2rem" backgroundColor={theme.color.backgroundMain}>
      <Box
        width="100%"
        objectFit="contain"
        maxHeight="30rem"
        overflow="hidden"
        justifyContent="center"
      >
        <S.MainImg src={fileRefs.clothesMain} alt="Clothes" />
      </Box>
      <Box
        flexDirection="row"
        gap="3rem"
        justifyContent="center"
        alignItems="center"
        padding="0 2rem"
      >
        <SelectInput
          optionsArray={clothes}
          initialValue="All"
          label="Category"
          handleSelect={option => buildQuery('subCategory', option)}
        />
        <SelectInput
          optionsArray={clothes}
          initialValue="All"
          label="Sort by"
          handleSelect={(option: string) => {
            console.log(option);
          }}
        />
      </Box>
      {data &&
        data.pages.map((data, i) => <PostList key={i} posts={data.posts} />)}

      <Box alignItems="center">
        <div ref={LoadMoreButton}>
          <Button buttonType={buttonType} onClick={() => fetchNextPage()}>
            {isFetchingNextPage || isLoading
              ? 'Loading more...'
              : isError
              ? 'Error!'
              : 'No more posts!'}
          </Button>
          {error instanceof Error && <p> error.message</p>}
        </div>
      </Box>
    </Box>
  );
};

export default Home;
