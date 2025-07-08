import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Posts } from './posts';
import { PostCard } from './post-card/post-card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostsDataSource } from './posts-data-source';
import { Observable, of } from 'rxjs';
import { Post } from './posts.models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

class MockPostsDataSource extends PostsDataSource {
  override connect(): Observable<(Post | undefined)[]> {
    return of([
      { id: 1, title: 'Post 1', body: 'Body 1', user: { id: 1, fullName: 'User 1' } },
    ]) as unknown as Observable<Post[]>;
  }
}

describe('Posts', () => {
  let component: Posts;
  let fixture: ComponentFixture<Posts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Posts, PostCard, ScrollingModule, HttpClientTestingModule, RouterTestingModule],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(Posts, {
        set: { imports: [PostCard, ScrollingModule] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Posts);
    component = fixture.componentInstance;
    component.posts = new MockPostsDataSource();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Posts');
  });

  it('should render a post card for each post', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const postCards = fixture.debugElement.queryAll(By.css('app-post-card'));
    expect(postCards.length).toBe(1);
  });

  it('trackByPostId should return post id if present', () => {
    const post = { id: 42, title: '', body: '' } as Post;
    expect(component.trackByPostId(0, post)).toBe(42);
  });

  it('trackByPostId should return index if post is undefined', () => {
    expect(component.trackByPostId(5, undefined)).toBe(5);
  });
});
