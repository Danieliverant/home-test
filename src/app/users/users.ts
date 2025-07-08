import { Component, computed, inject, signal } from '@angular/core';
import { UsersService } from './users.service';
import { UserCard } from './user-card/user-card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from './users.models';
import { getFullName } from './user.utils';

@Component({
  selector: 'app-users',
  imports: [UserCard, MatFormField, MatLabel, MatIcon, MatIconButton, MatInput, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private readonly userService = inject(UsersService);
  private users = toSignal(this.userService.getUsers(), { initialValue: [] });

  query = signal('');

  filteredUsers = computed(() =>
    this.users().filter((user) => this.getFullName(user).includes(this.query().toLowerCase())),
  );

  private getFullName(user: User): string {
    return getFullName(user).toLowerCase();
  }
}
