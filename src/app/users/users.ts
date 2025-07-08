import { Component, computed, signal } from '@angular/core';
import { UserCard } from './user-card/user-card';
import { MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { User, UsersResponse } from './users.models';
import { getFullName } from './user.utils';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports: [
    UserCard,
    MatFormField,
    MatLabel,
    MatIcon,
    MatPrefix,
    MatSuffix,
    MatIconButton,
    MatInput,
    FormsModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  usersRes = httpResource<UsersResponse>(() => 'https://dummyjson.com/users', {
    defaultValue: {
      users: [],
      total: 0,
      skip: 0,
      limit: 0,
    },
  });

  query = signal('');

  filteredUsers = computed(() =>
    this.usersRes
      .value()
      .users.filter((user) => this.getFullName(user).includes(this.query().toLowerCase())),
  );

  private getFullName(user: User): string {
    return getFullName(user).toLowerCase();
  }
}
