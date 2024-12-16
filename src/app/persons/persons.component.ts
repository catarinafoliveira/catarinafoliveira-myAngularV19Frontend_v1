import { Component } from '@angular/core';
import { PERSONS } from '../personsEx';
import { Person } from '../../../person';

@Component({
  selector: 'app-persons',
  imports: [],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent {
  persons = PERSONS;
  selectedPerson ? : Person;

  onSelect ( person: Person ) {
    this.selectedPerson = person;
  }
}
