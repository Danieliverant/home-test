import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Header } from './header';
import { HeaderLink } from './header.models';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { RouterLink } from '@angular/router';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, MatToolbar, MatButton, RouterTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the title in the toolbar', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();

    const toolbar: HTMLElement = fixture.nativeElement.querySelector('mat-toolbar');
    expect(toolbar.textContent).toContain('Test Title');
  });

  it('should render navigation links', () => {
    const links: HeaderLink[] = [
      { label: 'Home', route: '/home' },
      { label: 'About', route: '/about' },
    ];
    fixture.componentRef.setInput('links', links);
    fixture.detectChanges();

    const linkButtons = fixture.debugElement.queryAll(By.directive(MatButton));
    expect(linkButtons.length).toBe(2);
    expect(linkButtons[0].nativeElement.textContent).toContain('Home');
    expect(linkButtons[1].nativeElement.textContent).toContain('About');
  });

  it('should apply RouterLink to navigation links', () => {
    const links: HeaderLink[] = [{ label: 'Home', route: '/home' }];
    fixture.componentRef.setInput('links', links);
    fixture.detectChanges();

    const linkButton = fixture.debugElement.queryAll(By.directive(MatButton))[0];
    const routerLinkInstance = linkButton.injector.get(RouterLink);
    expect(routerLinkInstance['routerLinkInput'][0]).toBe('/home');
  });
});
