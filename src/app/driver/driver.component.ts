import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';
import { MessageService } from '../services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var window: any;

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit{
  drivers: Driver[] = [];
  selectedDriver : Driver = this.reset();
  showAddForm: boolean = false;
  newDriver: Driver = this.reset();
  showEditForm: boolean = false;
  backupDriver: Driver = this.reset();
  confirmationIdCard: string = '';
  
  constructor(
    private modalService: NgbModal,
    private driverService: DriverService,
    private messageService: MessageService
  ){}

  // #region generic
  
  getDrivers(): void{
    this.driverService.getDrivers()
    .subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }
  
  ngOnInit(){
    this.getDrivers();
  }
  
  reset(): Driver {
    return { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  }
  
  cancel(): void{
    this.newDriver = this.reset();
    this.selectedDriver = this.reset();
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
    this.newDriver = this.reset();
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
  }
  
  openAddModal(content: any): void {
    this.openModal(content);
  }
  
  confirmAdd(): void {
    this.modalService.dismissAll();
    this.driverService.createDriver(this.newDriver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver created successfully.',
          type: 'alert alert-success'
        });
        this.newDriver = this.reset();
        this.showEditForm = false;
        this.showAddForm = false;
        this.getDrivers();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error creating driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }

  // #endregion

  // #region EDIT
  
  toggleEdit(driver: Driver) {
    this.backupDriver = { ...driver }; 
    this.selectedDriver = { ...driver }; 
    this.showEditForm = !this.showEditForm;
    this.showAddForm = false;
  }
  
  openEditModal(content: any): void {
    this.openModal(content);
  }
  
  confirmEdit(): void {
    this.modalService.dismissAll();
    this.driverService.updateDriver(this.selectedDriver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver updated successfully.',
          type: 'alert alert-success'
        });
        this.selectedDriver = this.reset();
        this.backupDriver = this.reset();
        this.showEditForm = false;
        this.showAddForm = false;
        this.getDrivers();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  
  // #endregion

  // #region DELETE
  openDeleteModal(content: any, driver: Driver): void {
    this.confirmationIdCard = '';
    this.selectedDriver = { ...driver }; 
    this.openModal(content);
  }

  confirmDeleteModal(): void {
    this.modalService.dismissAll();
    if(this.confirmationIdCard===this.selectedDriver.idCard){
      this.confirmDelete(this.selectedDriver);
    } else {
      this.messageService.sendMessage({
        text: 'IDs do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
  }
  
  confirmDelete(driver: Driver): void {
    this.driverService.deleteDriver(driver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver deleted successfully.',
          type: 'alert alert-success'
        });
        this.getDrivers();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  // #endregion
}