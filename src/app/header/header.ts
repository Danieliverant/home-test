import { Component, input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLink } from './header.models';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  title = input<string>();
  links = input<HeaderLink[]>([]);
}
