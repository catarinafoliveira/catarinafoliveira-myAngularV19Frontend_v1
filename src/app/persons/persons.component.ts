import { Component } from '@angular/core';
import { PERSONS } from '../personsEx';
import { Person } from '../../../person';
import { PersonDetailsComponent } from '../person-details/person-details.component';

@Component({
  selector: 'app-persons',
  imports: [PersonDetailsComponent],
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
