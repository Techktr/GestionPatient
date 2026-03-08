import { Routes } from '@angular/router';
import {PatientList} from './patient/patient-list/patient-list';
import {PatientDetails} from './patient/patient-details/patient-details';
import {Home} from './home/home';
import {PatientForm} from './patient/patient-form/patient-form';
import {PractitionerList} from './practitioner/practitioner-list/practitioner-list';
import {PractitionerForm} from './practitioner/practitioner-form/practitioner-form';
import {PractitionerDetails} from './practitioner/practitioner-details/practitioner-details';

export const routes: Routes = [
  {path:"", component: Home},
  {path: "patients", component: PatientList},
  {path: "patients/create", component: PatientForm},
  {path: "patients/:id/edit" , component: PatientForm},
  {path: "patients/:id", component: PatientDetails},
  {path: "practitioners", component: PractitionerList},
  {path: "practitioners/create", component: PractitionerForm},
  {path: "practitioners/:id/edit", component: PractitionerForm},
  {path: "practitioners/:id", component: PractitionerDetails},
];
