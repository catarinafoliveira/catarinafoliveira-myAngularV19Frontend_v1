import { Injectable } from '@angular/core';
import { Person } from '../../person';
import { PERSONS } from './personsEx';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPersons () : Person []{
     return PERSONS;
  }
}
