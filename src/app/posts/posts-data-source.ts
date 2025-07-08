import { Post } from './posts.models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

/**
 * Taken from Angular Material documentation: https://material.angular.dev/cdk/scrolling/examples#cdk-virtual-scroll-data-source
 */
export class PostsDataSource extends DataSource<Post | undefined> {
  // TODO: handle loading state and errors.
  private _length = 251; // TODO: this number should be fetched from the API.
  private _pageSize = 30;
  private _cachedData = Array.from<Post>({ length: this._length });
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject<(Post | undefined)[]>(this._cachedData);
  private readonly _subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(Post | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      }),
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    const skip = page * this._pageSize;

    fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${this._pageSize}`)
      .then((res) => res.json())
      // TODO: here we can get the total number and update the cached array by it.
      .then((data) => data.posts)
      .then((posts) => {
        this._cachedData.splice(page * this._pageSize, this._pageSize, ...posts);
        this._dataStream.next(this._cachedData);
      });
  }
}
