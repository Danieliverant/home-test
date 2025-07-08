import { Component, input } from '@angular/core';
import { Comment } from './post-comment.models';

@Component({
  selector: 'app-post-comment',
  imports: [],
  templateUrl: './post-comment.html',
  styleUrl: './post-comment.scss',
})
export class PostComment {
  comment = input.required<Comment>();
}
