import { inject, Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { Observable } from 'rxjs';
import { User } from './users.models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly usersApiService = inject(UsersApiService);

  getUsers(): Observable<User[]> {
    return this.usersApiService.getUsers();
  }
}
