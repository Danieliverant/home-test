import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetails } from './post-details';
import { PostCard } from '../post-card/post-card';
import { PostComment } from '../post-comment/post-comment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';

fdescribe('PostDetails', () => {
  let component: PostDetails;
  let fixture: ComponentFixture<PostDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetails, PostCard, PostComment, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetails);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
