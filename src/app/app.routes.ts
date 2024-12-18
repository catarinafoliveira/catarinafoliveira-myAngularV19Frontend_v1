import { Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { DriverComponent } from './driver/driver.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'persons', component: PersonComponent},
    {path:'drivers', component: DriverComponent},
    {path:'cars', component: CarComponent},
];
