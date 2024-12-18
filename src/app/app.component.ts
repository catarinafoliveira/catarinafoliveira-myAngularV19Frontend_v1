import { Component } from '@angular/core';
import { RouterLink , RouterOutlet } from '@angular/router';

@Component ({
  selector: 'app-root' ,
  standalone: true ,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html' ,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = ' myFrontend_v1 ';
  message: { text: string; type: string } | null = null;
}