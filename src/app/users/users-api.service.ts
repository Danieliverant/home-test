import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users.models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    // TODO: type for the response itself.
    // TODO: error handling.
    return this.http
      .get<{ users: User[] }>('https://dummyjson.com/users')
      .pipe(map(({ users }) => users));
  }
}
