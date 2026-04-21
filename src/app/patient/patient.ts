import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {Patient} from './models/patient.interface';
import {PatientCreate} from './models/patient-create.interface';
import {PatientUpdate} from './models/patient-update.interface';
import { API_BASE_URL } from '../core/constants';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/patient`;
  public patients: Patient[] = [];

  public getPatients(): Observable<Patient[]> {
    if (this.patients.length > 0) {
      return of(this.patients);
    }
    return this.http.get<Patient[]>(this.apiUrl)
      .pipe(tap((patients) => this.patients = patients));
  }

  public getPatientsById(id: number): Observable<Patient | undefined> {
    const cached = this.patients.find(p => p.id === id);
    if (cached) {
      return of(cached);
    }
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  public addPatient(patient: PatientCreate): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient)
      .pipe(tap((created) => this.patients.push(created)));
  }

  public updatePatient(patientUpdated: PatientUpdate): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${patientUpdated.id}`, patientUpdated)
      .pipe(tap(() => {
        const index = this.patients.findIndex(p => p.id === patientUpdated.id);
        if (index !== -1) {
          let patient = this.patients[index];
          this.patients[index] = {...patient, ...patientUpdated};
        }
      }));
  }

  public deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        this.patients = this.patients.filter(p => p.id !== id);
      }));
  }

}
