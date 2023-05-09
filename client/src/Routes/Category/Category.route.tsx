import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './category.styles';
import { useEffect, useRef } from 'react';
import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import Box from '../../components/common/Box/Box.component';
import PostList from '../../components/common/PostList/PostList.component';
import { theme } from '../../styles/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import FilterPopup from './FilterPopup/FilterPopup.component';
import { queryClient } from '../../main';
import {
  selectQuery,
  selectQueryData,
} from '../../store/features/query/query.selectors';
import { setQuery } from '../../store/features/query/querySlice';
import { ResponseWithData, getPosts } from '../../utils/hooks/reactQueryHooks';
import { Enum } from '../../utils/types/interfaces/enums.interface';
import { imgUrls } from '../../utils/urls/imgUrls';
import { PostQueryResult } from '../../utils/types/interfaces/post.interface';

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const LoadMoreButton = useRef<HTMLDivElement>(null);

  const [isFitlerPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false);
  const queryData = useSelector(selectQueryData);
  const query = useSelector(selectQuery);

  const enumsData: ResponseWithData<Enum[]> | undefined =
    queryClient.getQueryData(['enums']);

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
      if (!lastPage) return undefined;
      const nextPage = lastPage.metadata.nextPage;
      const totalPages = lastPage.metadata.totalPages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !!query,
  });

  // useEffect(() => {
  //   getFilterResults();
  // }, [category]);

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

  const getFilterResults = () => {
    const categoriesString = queryData.Categories.join(',');
    const sizesString = queryData.Sizes.join(',');
    const ageString = queryData.Age.join(',');
    const sortString =
      queryData.Sort[0] === 'Most Recent'
        ? '-createdAt'
        : queryData.Sort[0] === 'Distance'
        ? 'distance'
        : '';

    let newQuery = `mainCategory=${category}`;

    if (categoriesString.length) {
      newQuery += `&subCategory=${categoriesString}`;
    }

    if (sizesString.length) {
      newQuery += `&size=${sizesString}`;
    }

    if (ageString.length) {
      newQuery += `&age=${ageString}`;
    }
    if (sortString.length) {
      newQuery += `&sort=${sortString}`;
    }

    dispatch(setQuery(newQuery));
    setIsFilterPopupOpen(false);
  };

  const buttonType =
    isFetchingNextPage || isLoading
      ? ButtonType.Pending
      : !hasNextPage || isFetchingNextPage
      ? ButtonType.Disabled
      : ButtonType.Message;

  return (
    <Box
      width="100%"
      minHeight="100vh"
      height="100%"
      gap="2rem"
      backgroundColor={theme.color.backgroundMain}
    >
      <Box
        width="100%"
        objectFit="contain"
        maxHeight="30rem"
        overflow="hidden"
        justifyContent="center"
      >
        <S.MainImg src={imgUrls.clothesMain} alt="Clothes" />
      </Box>
      <Box
        flexDirection="row"
        gap="3rem"
        justifyContent="center"
        alignItems="center"
        padding="0 2rem"
      >
        <Box width="100%" alignItems="flex-end">
          <Button
            onClick={() => setIsFilterPopupOpen(true)}
            buttonType={ButtonType.Message}
          >
            Filter
          </Button>
        </Box>
        {category && enumsData && isFitlerPopupOpen && (
          <FilterPopup
            categoryName={category}
            subCategories={enumsData.data.data[0][category.toLowerCase()]}
            onClick={() => setIsFilterPopupOpen(false)}
            getFilterResults={getFilterResults}
          />
        )}
      </Box>
      {data &&
        data.pages[0] &&
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

export default Category;
