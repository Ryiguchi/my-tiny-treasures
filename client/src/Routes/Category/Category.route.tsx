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
  selectTempQueryData,
} from '../../store/features/query/query.selectors';
import {
  initialQueryData,
  setQuery,
  setQueryData,
  setTempQueryData,
} from '../../store/features/query/querySlice';
import { ResponseWithData, getPosts } from '../../utils/hooks/reactQueryHooks';
import { Enum } from '../../utils/types/interfaces/enums.interface';
import { imgUrls } from '../../utils/urls/imgUrls';

const Category: React.FC = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const LoadMoreButton = useRef<HTMLDivElement>(null);

  const [isFitlerPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false);
  const queryData = useSelector(selectQueryData);
  const tempQueryData = useSelector(selectTempQueryData);
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
    const categoriesString = tempQueryData.Categories.join(',');
    const sizesString = tempQueryData.Sizes.join(',');
    const ageString = tempQueryData.Age.join(',');
    const sortString =
      tempQueryData.Sort[0] === 'Most Recent'
        ? '-createdAt'
        : tempQueryData.Sort[0] === 'Distance'
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
    dispatch(setQueryData(tempQueryData));
    dispatch(setTempQueryData(initialQueryData));
    setIsFilterPopupOpen(false);
  };

  const handleCancelFiltering = () => {
    dispatch(setTempQueryData(initialQueryData));
    setIsFilterPopupOpen(false);
  };

  const buttonType =
    isFetchingNextPage || isLoading
      ? ButtonType.SmallYellow
      : !hasNextPage || isFetchingNextPage
      ? ButtonType.SmallTransparent
      : ButtonType.SmallGreen;

  return (
    <>
      {category && enumsData && isFitlerPopupOpen ? (
        <FilterPopup
          onClick={handleCancelFiltering}
          getFilterResults={getFilterResults}
          categoryName={category}
        />
      ) : (
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
            <Box width="100%" alignItems="center">
              <Button
                onClick={() => setIsFilterPopupOpen(true)}
                buttonType={ButtonType.SmallGreen}
              >
                Filter
              </Button>
            </Box>
          </Box>
          {data &&
            data.pages[0] &&
            data.pages.map((data, i) => (
              <PostList key={i} posts={data.posts} />
            ))}

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
      )}
    </>
  );
};

export default Category;
