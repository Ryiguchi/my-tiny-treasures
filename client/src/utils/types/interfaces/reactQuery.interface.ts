export interface QueryClientResults<T> {
  data: {
    data: T;
  };
}

export interface Metadata {
  nextPage: number;
  totalPages: number;
  totalResults: number;
  _id: null;
}
