import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserCard } from './user-card';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  const mockUser = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    image: 'avatar.jpg',
    company: { name: 'Acme Inc.' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserCard,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatCardActions,
        MatButton,
        RouterTestingModule,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render user full name as title', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.user-title');
    expect(title.textContent).toContain('Jane Doe');
  });

  it('should render company name and email', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.user-body');
    expect(content.textContent).toContain('Company: Acme Inc.');
    expect(content.textContent).toContain('Email: jane@example.com');
  });

  it('should render the avatar image', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img[alt="user-avatar"]');

    expect(img).toBeTruthy();
    expect(img.getAttribute('ngsrc') || img.getAttribute('src')).toContain('avatar.jpg');
  });

  it('should show "View" button when showViewMore is true', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.componentRef.setInput('showViewMore', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(MatButton));
    expect(button.nativeElement.textContent).toContain('View');
  });

  it('should not show "View" button when showViewMore is false', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.componentRef.setInput('showViewMore', false);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(MatButton));
    expect(button).toBeNull();
  });

  it('should apply RouterLink to "View" button', () => {
    fixture.componentRef.setInput('user', mockUser);
    fixture.componentRef.setInput('showViewMore', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(MatButton));
    const routerLinkInstance = button.injector.get(RouterLink);
    expect(routerLinkInstance['routerLinkInput'][0]).toBe('/users/1');
  });
});
