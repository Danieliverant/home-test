import { ApiResponse } from '../common/api.models';

export interface PostReactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: PostReactions;
  views: number;
  userId: number;
}

export interface PostResponse extends ApiResponse {
  posts: Post[];
}
