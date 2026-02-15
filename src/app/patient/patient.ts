import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Patient} from './patient.interface';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);

  public getPatients ():Observable<Patient[]> {
    return this.http.get<Patient[]>("patients.json");
  }

  public getPatientsById(id:number):Observable<Patient | undefined> {
    return this.http.get<Patient[]>('patients.json')
      .pipe(map(patients => patients.find(patient => patient.id == id)));
  }

}
