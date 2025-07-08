import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCard } from './post-card.component';

describe('Post', () => {
  let component: PostCard;
  let fixture: ComponentFixture<PostCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
