import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Chat, Post, PostQueryResult, User, UserMsgData } from './interfaces';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface ResponseWithData<T> {
  status: string;
  results?: number;
  data: {
    [key: string]: T;
  };
}

interface ResponseWithError {
  status: string;
  error?: Error;
  message: string;
  stack?: string;
}

const baseUrl = 'http://localhost:8000/api/v1';

export const checkForError = (
  data:
    | ResponseWithData<Post[] | Post | UserMsgData | Chat | PostQueryResult[]>
    | ResponseWithError
): void => {
  if (data.status === 'error' || data.status === 'fail') {
    throw new Error('Something went wrong!');
  }
};

// export const useAllPosts = () => {
//   return useQuery({
//     queryKey: ['posts'],
//     queryFn: async () => {
//       const data: AxiosResponse<ResponseWithData<Post[]>> = await axios.get(
//         `${baseUrl}/posts`
//       );
//       checkForError(data.data);
//       return data.data;
//     },
//   });
// };

export const usePost = (postId: string | undefined) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (postId) {
        const data: AxiosResponse<ResponseWithData<Post>> = await axios.get(
          `${baseUrl}/posts/${postId}`
        );
        checkForError(data.data);
        return data.data;
      }
    },
    enabled: !!postId,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 3 * 60 * 1000,
  });
};

const getPosts = async ({ pageParam = 1 }): Promise<PostQueryResult> => {
  const limit = 20;
  const data: AxiosResponse<ResponseWithData<PostQueryResult[]>> =
    await axios.get(`${baseUrl}/posts/?page=${pageParam}&limit=${limit}`);
  // console.log(data);
  checkForError(data.data);
  // console.log(data.data.data.data[0]);
  return data.data.data.data[0];
};

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.metadata.nextPage;
      const totalPages = lastPage.metadata.totalPages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 3 * 60 * 1000,
  });
};

// TODO: only fetch when called
export const useMsgData = (user: User | null) => {
  return useQuery({
    queryKey: ['msgData', user],
    queryFn: async () => {
      const data: AxiosResponse<ResponseWithData<UserMsgData>> =
        await axios.get(`${baseUrl}/users/getMsgData`);
      checkForError(data.data);
      return data.data;
    },
    enabled: !!user,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    staleTime: 5 * 1000,
  });
};

export const useChat = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ['chat', roomId],
    queryFn: async () => {
      if (roomId) {
        const data: AxiosResponse<ResponseWithData<Chat>> = await axios.get(
          `${baseUrl}/chats/${roomId}`
        );
        checkForError(data.data);
        return data.data;
      }
    },
    enabled: !!roomId,
    staleTime: 1000,
  });
};

export const useCreateNewPost = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`${baseUrl}/posts`, data);
    },
  });
};
