import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts.models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  http = inject(HttpClient);

  getPosts(page = 0, limit = 30): Observable<Post[]> {
    const skip = page * limit;

    // TODO: type for the response itself.
    // TODO: error handling.
    return this.http
      .get<{ posts: Post[] }>('https://dummyjson.com/posts', {
        params: {
          skip: skip.toString(),
          limit: limit.toString(),
        },
      })
      .pipe(map(({ posts }) => posts));
  }
}
