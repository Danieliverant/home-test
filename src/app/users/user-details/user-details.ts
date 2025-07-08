import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { User } from '../users.models';
import { UserCard } from '../user-card/user-card';
import { PostResponse } from '../../posts/posts.models';
import { PostCard } from '../../posts/post-card/post-card';

@Component({
  selector: 'app-user-details',
  imports: [UserCard, PostCard],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  id = input.required<string>();

  user = httpResource<User>(() => `https://dummyjson.com/users/${this.id()}`);

  postsRes = httpResource<PostResponse>(() => `https://dummyjson.com/posts/user/${this.id()}`, {
    defaultValue: {
      posts: [],
      total: 0,
      skip: 0,
      limit: 0,
    },
  });
}
