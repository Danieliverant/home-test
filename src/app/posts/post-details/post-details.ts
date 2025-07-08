import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { PostCard } from '../post-card/post-card';
import { Post } from '../posts.models';
import { PostComment } from '../post-comment/post-comment';
import { CommentResponse } from '../post-comment/post-comment.models';

@Component({
  selector: 'app-post-details',
  imports: [PostCard, PostComment],
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss',
})
export class PostDetails {
  id = input.required<string>();

  post = httpResource<Post>(() => `https://dummyjson.com/posts/${this.id()}`);

  commentsRes = httpResource<CommentResponse>(
    () => `https://dummyjson.com/posts/${this.id()}/comments`,
    {
      defaultValue: {
        comments: [],
        total: 0,
        skip: 0,
        limit: 0,
      },
    },
  );
}
