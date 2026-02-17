import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {Patient} from './patient.interface';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  public patients: Patient[] = [];

  public getPatients ():Observable<Patient[]> {
    if (this.patients.length > 0){
      return of(this.patients);
    }
    else {
      return this.http.get<Patient[]>("patients.json").pipe(tap((patients) => this.patients = patients));
    }
  }

  public getPatientsById(id:number):Observable<Patient | undefined> {
    if (this.patients.length > 0){
      return of(this.patients.find(patient => patient.id === id));
    }
    else {
      return this.http.get<Patient[]>('patients.json')
        .pipe(tap((patients) => this.patients = patients))
        .pipe(map(patients => patients.find(patient => patient.id == id)));
    }
  }

  public addPatient(patient: Patient) {
    this.patients.push(patient);
  }

  public updatePatient(patientUpdated: Patient) {
    let id = this.patients.findIndex(patient => patientUpdated.id == patient.id);
    return this.patients.splice(id, 1, patientUpdated);
  }

}
