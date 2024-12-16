import { Component, Input } from '@angular/core';
import { Person } from '../../../person';

@Component({
  selector: 'app-person-details',
  imports: [],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent {
  @Input() selectedPerson? : Person;
}
