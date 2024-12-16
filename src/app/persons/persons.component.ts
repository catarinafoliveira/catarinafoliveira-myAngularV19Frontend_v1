import { Component } from '@angular/core';
import { Person } from '../../../person';

@Component({
  selector: 'app-persons',
  imports: [],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent {
  person: Person = {
    name: "Person 1"
  };
}
