import { Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { User } from '../users.models';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { getFullName } from '../user.utils';

@Component({
  selector: 'app-user-card',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  showViewMore = input<boolean>(true);

  user = input.required<User>();
  fullName = computed(() => getFullName(this.user()));
}
