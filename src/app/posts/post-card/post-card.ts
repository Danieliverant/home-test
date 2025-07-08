import { Component, computed, input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { Post } from '../posts.models';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { User } from '../../users/users.models';
import { getFullName } from '../../users/user.utils';

@Component({
  selector: 'app-post-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
  ],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  post = input.required<Post>();

  showAuthor = input<boolean>(false);
  truncateText = input<boolean>(true);

  author = httpResource<User>(() =>
    this.showAuthor() ? `https://dummyjson.com/users/${this.post().userId}` : undefined,
  );
  authorFullName = computed(() => (this.author.value() ? getFullName(this.author.value()!) : ''));
}
