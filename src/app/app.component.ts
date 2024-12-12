import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonsComponent } from './persons/persons.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PersonsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myAngularV19Frontend';
}
