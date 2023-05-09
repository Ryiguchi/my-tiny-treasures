import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {} from '../types/interfaces/general.interfaces';
import { queryClient } from '../../main';
import { apiUrl, baseUrl } from '../urls/serverUrls';
import { Post, User } from '../types/interfaces/state.interface';
import { MsgData, UserMsgData } from '../types/interfaces/message.interface';
import { Chat } from '../types/interfaces/chat.interface';
import { PostQueryResult } from '../types/interfaces/post.interface';
import { Enum } from '../types/interfaces/enums.interface';

export interface ResponseWithData<T> {
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

export const checkForError = (
  data:
    | ResponseWithData<
        Post[] | Post | UserMsgData | Chat | PostQueryResult[] | Enum[]
      >
    | ResponseWithError
): void => {
  if (data.status === 'error' || data.status === 'fail') {
    throw new Error('Something went wrong!');
  }
};

type getPostParams = {
  pageParam: number;
  query: string | undefined;
};

export const usePost = (postId: string | undefined) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (postId) {
        const data: AxiosResponse<ResponseWithData<Post[]>> = await axios.get(
          `${apiUrl}/posts/${postId}`
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

export const getPosts = async ({
  pageParam = 1,
  query = '',
}: getPostParams): Promise<PostQueryResult> => {
  const limit = 20;
  const data: AxiosResponse<ResponseWithData<PostQueryResult[]>> =
    await axios.get(
      `${apiUrl}/posts/?page=${pageParam}&limit=${limit}&${query}`
    );

  checkForError(data.data);

  return data.data.data.data[0];
};

export const useMsgData = (user: User | null) => {
  return useQuery({
    queryKey: ['msgData'],
    queryFn: async () => {
      console.log('MSGDATA');
      const data: AxiosResponse<ResponseWithData<UserMsgData>> =
        await axios.get(`${apiUrl}/users/getMsgData`);
      checkForError(data.data);
      return data.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000,
    enabled: !!user,
  });
};

export const useChat = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ['chat', roomId],
    queryFn: async () => {
      if (roomId) {
        const data: AxiosResponse<ResponseWithData<Chat>> = await axios.get(
          `${apiUrl}/chats/${roomId}`
        );
        checkForError(data.data);
        return data.data;
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!roomId,
    staleTime: 1000,
  });
};

export const useCreateNewPost = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(`${apiUrl}/posts`, data);
    },
  });
};

export const useEnums = () => {
  return useQuery({
    queryKey: ['enums'],
    queryFn: async () => {
      const data: AxiosResponse<ResponseWithData<Enum[]>> = await axios.get(
        `${apiUrl}/enums`
      );
      checkForError(data.data);
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const msgDataMutationOptions = {
  mutationFn: async (): Promise<void> => console.log('Mutating'),
  onMutate: async (msg: MsgData) => {
    await queryClient.cancelQueries({ queryKey: ['chat'] });

    const previousChatData = queryClient.getQueryData(['chat']);

    queryClient.setQueryData(['chat'], (old: Chat | undefined) => {
      if (!old) return;
      const newChatData = { ...old, messsages: [old.messages, msg] };
      return newChatData;
    });

    return { previousChatData };
  },
  onError: (err: Error, msg: MsgData, context: any): void => {
    console.log(err);
    queryClient.setQueryData(['chat'], context?.previousChatData);
  },
  onSettled: (): void => {
    queryClient.invalidateQueries({ queryKey: ['chat'] });
  },
};
