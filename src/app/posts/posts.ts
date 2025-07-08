import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Post } from './posts.models';
import { PostCard } from './post/post-card';
import { PostsDataSource } from './posts-data-source';

@Component({
  selector: 'app-posts',
  imports: [PostCard, ScrollingModule],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  posts = new PostsDataSource();

  trackByPostId(index: number, post: Post | undefined): number {
    return post?.id ?? index;
  }
}
