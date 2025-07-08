import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { HeaderLink } from './header/header.models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  links: HeaderLink[] = [
    { label: 'Posts', route: '/posts' },
    { label: 'Users', route: '/users' },
  ];

  title = 'My App';
}
