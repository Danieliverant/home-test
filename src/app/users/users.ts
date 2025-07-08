import { Component, inject } from '@angular/core';
import { UsersService } from './users.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private readonly userService = inject(UsersService);

  users$ = this.userService.getUsers();
}
