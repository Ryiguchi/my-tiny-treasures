import { Metadata } from './reactQuery.interface';
import { Post } from './state.interface';

export interface PostQueryResult {
  metadata: Metadata;
  posts: Post[];
}
