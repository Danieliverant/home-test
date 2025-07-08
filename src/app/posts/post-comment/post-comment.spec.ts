import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComment } from './post-comment';
import { Comment } from './post-comment.models';
import { provideZonelessChangeDetection } from '@angular/core';

fdescribe('PostComment', () => {
  let component: PostComment;
  let fixture: ComponentFixture<PostComment>;

  const mockComment: Partial<Comment> = {
    id: 1,
    postId: 2,
    body: 'Test comment body',
    user: {
      id: 3,
      fullName: 'Jane Doe',
      username: 'jane_doe',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComment],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComment);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('comment', mockComment);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render comment user fullName and body', () => {
    fixture.componentRef.setInput('comment', mockComment);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.comment-header');
    const body = fixture.nativeElement.querySelector('.comment-body');
    expect(header.textContent).toContain('Jane Doe');
    expect(body.textContent).toContain('Test comment body');
  });
});
