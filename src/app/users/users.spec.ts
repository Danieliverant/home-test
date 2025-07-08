import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Users } from './users';
import { UserCard } from './user-card/user-card';
import { User } from './users.models';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;

  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      image: 'avatar.jpg',
      company: { name: 'Acme Inc.' },
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      image: 'avatar2.jpg',
      company: { name: 'Beta LLC' },
    },
  ] as unknown as User[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users, UserCard, HttpClientTestingModule, RouterTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show loading when usersRes is loading', () => {
    spyOn(component.usersRes, 'isLoading').and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading...');
  });

  it('should show error when usersRes has error', () => {
    spyOn(component.usersRes, 'isLoading').and.returnValue(false);
    spyOn(component.usersRes, 'error').and.returnValue(new Error());
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Something went wrong');
  });

  it('should render a user card for each user', () => {
    spyOn(component.usersRes, 'isLoading').and.returnValue(false);
    spyOn(component.usersRes, 'error').and.returnValue(undefined);
    spyOn(component.usersRes, 'value').and.returnValue({
      users: mockUsers,
      total: 2,
      skip: 0,
      limit: 10,
    });
    fixture.detectChanges();

    const userCards = fixture.debugElement.queryAll(By.directive(UserCard));
    expect(userCards.length).toBe(2);
  });

  it('should filter users by query', () => {
    spyOn(component.usersRes, 'isLoading').and.returnValue(false);
    spyOn(component.usersRes, 'error').and.returnValue(undefined);
    spyOn(component.usersRes, 'value').and.returnValue({
      users: mockUsers,
      total: 2,
      skip: 0,
      limit: 10,
    });
    fixture.detectChanges();

    component.query.set('jane');
    fixture.detectChanges(); // update for query change
    fixture.detectChanges(); // ensure computed signal updates

    const userCards = fixture.debugElement.queryAll(By.directive(UserCard));
    expect(userCards.length).toBe(1);
  });

  it('should show no user cards if filteredUsers is empty', () => {
    spyOn(component.usersRes, 'isLoading').and.returnValue(false);
    spyOn(component.usersRes, 'error').and.returnValue(undefined);
    spyOn(component.usersRes, 'value').and.returnValue({
      users: [],
      total: 0,
      skip: 0,
      limit: 10,
    });
    fixture.detectChanges();

    const userCards = fixture.debugElement.queryAll(By.directive(UserCard));
    expect(userCards.length).toBe(0);
  });
});
