import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostCard } from './post-card';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { Post } from '../posts.models';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostCard', () => {
  let component: PostCard;
  let fixture: ComponentFixture<PostCard>;

  const mockPost: Partial<Post> = {
    id: 1,
    userId: 2,
    title: 'Test Post Title',
    body: 'Test post body content',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostCard,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatCardActions,
        MatButton,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render post title and body', () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.post-title');
    const body = fixture.nativeElement.querySelector('.post-body');
    expect(title.textContent).toContain('Test Post Title');
    expect(body.textContent).toContain('Test post body content');
  });

  it('should show author when showAuthor is true', async () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.componentRef.setInput('showAuthor', true);
    fixture.detectChanges();

    fixture.detectChanges();

    const subtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent).toContain('By:');
  });

  it('should not show author when showAuthor is false', () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.componentRef.setInput('showAuthor', false);
    fixture.detectChanges();

    const subtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(subtitle).toBeNull();
  });

  it('should show "View" button when showViewMore is true', () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.componentRef.setInput('showViewMore', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(MatButton));
    expect(button.nativeElement.textContent).toContain('View');
  });

  it('should not show "View" button when showViewMore is false', () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.componentRef.setInput('showViewMore', false);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(MatButton));
    expect(button).toBeNull();
  });

  it('should apply RouterLink to "View" button', () => {
    fixture.componentRef.setInput('post', mockPost);
    fixture.componentRef.setInput('showViewMore', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(MatButton));
    const routerLinkInstance = button.injector.get(RouterLink);
    expect(routerLinkInstance['routerLinkInput'][0]).toBe('/posts/1');
  });
});
