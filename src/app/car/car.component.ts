import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Car } from '../models/car';
import { Driver } from '../models/driver';
import { CarService } from '../services/car.service';
import { MessageService } from '../services/message.service';
import { DriverService } from '../services/driver.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars: Car[] = [];
  edit: boolean = false;
  add: boolean = false;
  drivers: Driver[] = [];
  newCar: Car = this.reset();
  selectedDriver: Driver = { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  activeCar: Car = this.reset();
  backupCar: Car = this.reset();
  backupSelectedDriver: Driver = { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  confirmationPlate: string = "";
  
  constructor(
    private modalService: NgbModal,
    private messageService: MessageService,
    private carService: CarService,
    private driverService: DriverService
  ){}
  
  // #region generic
  reset(): Car {
    return {_id:"", date:"", plate:"",ownerIdCard:"",ownerLicence:"", ownerName:"",seeOwner:false};
  }
  
  getCars(): void {
    this.carService.getCars()
    .subscribe((data: Car[]) => {
      this.cars = data.map(car => ({ ...car, seeOwner: false }));
    });
  }
  
  getDrivers(): void{
    this.driverService.getDrivers()
    .subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }
  
  ngOnInit(){
    this.getCars();
  }
  
  toggleSee(car: Car): void{
    car.seeOwner = !car.seeOwner;
  }

  formatDate(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  
  unformatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  openModal(content: any): void {
    this.modalService.open(content, { 
      ariaLabelledBy: 'modal-basic-title',
      centered: true 
    });
  }
  // #endregion

  // #region ADD
  toggleAdd(): void{
    this.newCar = this.reset();
    this.getDrivers();
    this.add = !this.add;
    this.edit = false;
  }
  
  openAddModal(content: any): void {
    this.newCar.date = this.formatDate(this.newCar.date);
    this.updateSelectedDriver(this.newCar.ownerLicence);
    this.openModal(content);
  }

  cancelAdd(): void{
    this.newCar = this.reset();
    this.add = false;
  }

  confirmAdd(): void {
    this.modalService.dismissAll();
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car created successfully.',
          type: 'alert alert-success'
        });
        this.newCar = this.reset();
        this.getCars();
        this.edit = false;
        this.add = false;
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error creating car: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  // #endregion

  // #region EDIT
  cancelEdit(): void{
    this.activeCar = this.reset();
    this.edit = false;
  }

  toggleEdit(car: Car): void{
    this.getDrivers();
    this.activeCar = { ...car };
    this.activeCar.date = this.unformatDate(this.activeCar.date);
    this.backupCar = { ...car };
    this.backupCar.date = this.unformatDate(this.backupCar.date);
    this.backupSelectedDriver.name = car.ownerName;
    this.backupSelectedDriver.idCard = car.ownerIdCard;
    this.edit = !this.edit;
    this.add = false;
  }

  openEditModal(content: any): void {
    this.updateSelectedDriver(this.activeCar.ownerLicence);
    this.activeCar.date = this.formatDate(this.activeCar.date);
    this.backupCar.date = this.formatDate(this.backupCar.date);
    this.openModal(content);
  }
  
  updateSelectedDriver(licence: string) {
    const driver = this.drivers.find(d => d.licence === licence);
    if (driver) {
      this.selectedDriver.name = driver.name;
      this.selectedDriver.idCard = driver.idCard;
    } else {
      this.selectedDriver.name = '';
      this.selectedDriver.idCard = '';
    }
  }
  
  confirmEdit(): void {
    this.modalService.dismissAll();
    this.carService.updateCar(this.activeCar).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car updated successfully.',
          type: 'alert alert-success'
        });
        this.activeCar = this.reset();
        this.backupCar = this.reset();
        this.edit = false;
        this.add = false;
        this.getCars();
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
  openDeleteModal(content: any, car: Car): void {
    this.activeCar = car;
    this.confirmationPlate = '';
    this.openModal(content);
  }
  
  
  confirmDeleteModal(): void {
    this.modalService.dismissAll();
    if (this.confirmationPlate === this.activeCar.plate) {
      this.confirmDelete(this.activeCar);
    } else {
      this.messageService.sendMessage({
        text: 'Plates do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.confirmationPlate="";
  }
  
  confirmDelete(car: Car): void {
    this.carService.deleteCar(car).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car deleted successfully.',
          type: 'alert alert-success'
        });
        this.getCars();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting car: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  // #endregion
}