import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from '../models/person';
import { PersonService } from '../services/person.service';
import { MessageService } from '../services/message.service';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})

export class PersonComponent implements OnInit{
  persons: Person[] = [];
  selectedPerson : Person = this.reset();
  showAddForm: boolean = false;
  newPerson: Person = this.reset();
  isDriver: boolean = false;
  showEditForm: boolean = false;
  backupPerson: Person = this.reset();
  confirmationIdCard: string = '';
  
  constructor(
    private modalService: NgbModal,
    private personService: PersonService,
    private messageService: MessageService,
    private driverService: DriverService
  ){}

  // #region generic
  ngOnInit(){
    this.getPersons();
  }

  getPersons(): void{
    this.personService.getPersons()
    .subscribe((data: Person[]) => {
      this.persons = data;
    });
  }

  reset(): Person {
    return { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  }

  cancel(): void{
    this.newPerson = this.reset();
    this.selectedPerson = this.reset();
    this.showAddForm = false;
    this.showEditForm = false;
  }

  openModal(content: any): void {
    this.modalService.open(content, { 
      ariaLabelledBy: 'modal-basic-title',
      centered: true 
    });
  }
  // #endregion

  // #region ADD
  toggleAdd(): void {
    this.newPerson = this.reset();
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
  }

  openAddModal(content: any): void {
    this.openModal(content);
  }

  confirmAdd(): void {
    this.modalService.dismissAll();
    if(this.isDriver){
      this.driverService.createDriver(this.newPerson).subscribe({
        next: () => {
          this.messageService.sendMessage({
            text: 'Driver created successfully.',
            type: 'alert alert-success'
          });
          this.newPerson = this.reset();
          this.showEditForm = false;
          this.showAddForm = false;
          this.getPersons();
        },
        error: (err) => {
          this.messageService.sendMessage({
            text: 'Error creating driver: ' + err.error.error,
            type: 'alert alert-danger'
          });
        }
      });
    } else {
      this.personService.createPerson(this.newPerson).subscribe({
        next: () => {
          this.messageService.sendMessage({
            text: 'Person created successfully.',
            type: 'alert alert-success'
          });
          this.newPerson = this.reset();
          this.showEditForm = false;
          this.showAddForm = false;
          this.isDriver = false;
          this.getPersons();
        },
        error: (err) => {
          this.messageService.sendMessage({
            text: 'Error creating person: ' + err.error.error,
            type: 'alert alert-danger'
          });
        }
      });
    }
  }
  // #endregion

  // #region EDIT
  toggleEdit(person: Person) {
    this.backupPerson = { ...person }; 
    this.selectedPerson = { ...person }; 
    this.showEditForm = !this.showEditForm;
    this.showAddForm = false;
  }

  openEditModal(content: any): void {
    this.openModal(content);
  }
  
  confirmEdit(): void {
    this.personService.updatePerson(this.selectedPerson).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Person updated successfully.',
          type: 'alert alert-success'
        });
        this.selectedPerson = this.reset();
        this.backupPerson = this.reset();
        this.showEditForm = false;
        this.showAddForm = false;
        this.getPersons();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating person: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
    this.modalService.dismissAll();
  }

  // #endregion

  // #region DELETE
  openDeleteModal(content: any, person: Person) {
    this.confirmationIdCard = '';
    this.selectedPerson = { ...person }; 
    this.openModal(content);
  }

  confirmDeleteModal(): void {
    if(this.confirmationIdCard===this.selectedPerson.idCard){
      this.confirmDelete(this.selectedPerson);
    } else {
      this.messageService.sendMessage({
        text: 'IDs do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.modalService.dismissAll();
  }
  
  confirmDelete(person: Person): void {
    this.personService.deletePerson(person).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Person deleted successfully.',
          type: 'alert alert-success'
        });
        this.getPersons();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting person: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  // #endregion
}