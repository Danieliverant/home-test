export interface CommentUser {
  id: number;
  username: string;
  fullName: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
}

export interface CommentResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}
