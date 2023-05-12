import { Metadata } from './reactQuery.interface';
import { Post } from './state.interface';

export interface PostQueryResult {
  metadata: Metadata;
  posts: Post[];
}

export interface GivePreviewFormData {
  [key: string]: string | string[] | File[];
  title: string;
  description: string;
  group: string;
  categories: string[];
  age: string;
  sizes: string[];
  itemCount: string;
  condition: string;
  location: string;
  images: File[];
}
