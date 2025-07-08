import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserDetails } from './user-details';
import { UserCard } from '../user-card/user-card';
import { PostCard } from '../../posts/post-card/post-card';
import { User } from '../users.models';
import { PostResponse } from '../../posts/posts.models';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetails', () => {
  let fixture: ComponentFixture<UserDetails>;
  let component: UserDetails;

  const mockUser: User = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    image: 'avatar.jpg',
    company: { name: 'Acme Inc.' },
  } as unknown as User;

  const mockPosts: PostResponse = {
    posts: [
      { id: 101, userId: 1, title: 'Post 1', body: 'Body 1' },
      { id: 102, userId: 1, title: 'Post 2', body: 'Body 2' },
    ],
    total: 2,
    skip: 0,
    limit: 10,
  } as unknown as PostResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetails, UserCard, PostCard, HttpClientTestingModule, RouterTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show loading when user is loading', () => {
    spyOn(component.user, 'isLoading').and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading...');
  });

  it('should show error when user has error', () => {
    spyOn(component.user, 'isLoading').and.returnValue(false);
    spyOn(component.user, 'error').and.returnValue(new Error());
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Something went wrong');
  });

  it('should render user card and posts', () => {
    spyOn(component.user, 'isLoading').and.returnValue(false);
    spyOn(component.user, 'error').and.returnValue(undefined);
    spyOn(component.user, 'value').and.returnValue(mockUser);

    spyOn(component.postsRes, 'isLoading').and.returnValue(false);
    spyOn(component.postsRes, 'error').and.returnValue(undefined);
    spyOn(component.postsRes, 'value').and.returnValue(mockPosts);

    fixture.detectChanges();

    // User card rendered
    const userCard = fixture.debugElement.query(By.directive(UserCard));
    expect(userCard).toBeTruthy();

    // Posts rendered
    const postCards = fixture.debugElement.queryAll(By.directive(PostCard));
    expect(postCards.length).toBe(2);
  });

  it('should show loading posts when postsRes is loading', () => {
    spyOn(component.user, 'isLoading').and.returnValue(false);
    spyOn(component.user, 'error').and.returnValue(undefined);
    spyOn(component.user, 'value').and.returnValue(mockUser);

    spyOn(component.postsRes, 'isLoading').and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading posts...');
  });

  it('should show posts error', () => {
    spyOn(component.user, 'isLoading').and.returnValue(false);
    spyOn(component.user, 'error').and.returnValue(undefined);
    spyOn(component.user, 'value').and.returnValue(mockUser);

    spyOn(component.postsRes, 'isLoading').and.returnValue(false);
    spyOn(component.postsRes, 'error').and.returnValue(new Error());
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Something went wrong');
  });

  it('should show "No posts." when posts array is empty', () => {
    spyOn(component.user, 'isLoading').and.returnValue(false);
    spyOn(component.user, 'error').and.returnValue(undefined);
    spyOn(component.user, 'value').and.returnValue(mockUser);

    spyOn(component.postsRes, 'isLoading').and.returnValue(false);
    spyOn(component.postsRes, 'error').and.returnValue(undefined);
    spyOn(component.postsRes, 'value').and.returnValue({ ...mockPosts, posts: [] });

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No posts.');
  });
});
