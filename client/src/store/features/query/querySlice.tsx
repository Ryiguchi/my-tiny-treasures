import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QueryData {
  [key: string]: string[];
  Categories: string[];
  Sizes: string[];
  Age: string[];
  Sort: string[];
}

export const initialQueryData: QueryData = {
  Categories: [],
  Sizes: [],
  Age: [],
  Sort: [],
};

interface QueryState {
  query: string;
  queryData: QueryData;
}

const initialState: QueryState = {
  query: '',
  queryData: initialQueryData,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    setQueryData: (state, { payload }: PayloadAction<QueryData>) => {
      state.queryData = payload;
    },
  },
});

export const { setQuery, setQueryData } = querySlice.actions;

export default querySlice.reducer;
