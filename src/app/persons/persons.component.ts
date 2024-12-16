import { Component } from '@angular/core';
import { Person } from '../../../person';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-persons',
  imports: [PersonDetailsComponent],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent {
  persons: Person [] = [];
  selectedPerson ? : Person;
  
  constructor ( private personService: PersonService ) {}
  
  onSelect ( person: Person ) {
    this.selectedPerson = person;
  }
  
  getPersons () {
    this.persons = this.personService.getPersons() ;
  }
  
  ngOnInit () {
    this.getPersons () ;
  }
}
