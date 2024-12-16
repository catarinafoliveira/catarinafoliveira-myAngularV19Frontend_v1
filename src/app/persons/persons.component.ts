import { Component } from '@angular/core';
import { PERSONS } from '../personsEx';

@Component({
  selector: 'app-persons',
  imports: [],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent {
  persons = PERSONS;
}
