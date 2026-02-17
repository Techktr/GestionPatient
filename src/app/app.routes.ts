import { Routes } from '@angular/router';
import {PatientList} from './patient/patient-list/patient-list';
import {PatientDetails} from './patient/patient-details/patient-details';
import {Home} from './home/home';
import {PatientForm} from './patient/patient-form/patient-form';

export const routes: Routes = [
  {path:"", component: Home},
  {path: "patients", component: PatientList},
  {path: "patients/create", component: PatientForm},
  {path: "patients/:id/edit" , component: PatientForm},
  {path: "patients/:id", component: PatientDetails}
];
