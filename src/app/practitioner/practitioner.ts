import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PractitionerUpdate} from './models/practitioner-update.interface';
import {Observable, tap} from 'rxjs';
import {PractitionerCreate} from './models/practitioner-create.interface';
import {Practitioner} from './models/practitioner.interface';
import { API_BASE_URL } from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = `${API_BASE_URL}/practitioner`;
  private practitioners: Practitioner[] = [];

  public getPractitioners():Observable<Practitioner[]> {
    return this.http.get<Practitioner[]>(this.apiUrl).pipe(tap((practitioners) => this.practitioners = practitioners));
  }

  public getPractitioner(id:number): Observable<Practitioner | undefined>  {
    return this.http.get<Practitioner | undefined>(`${this.apiUrl}/${id}`);
  }

  public addPractitioner(practitioner:PractitionerCreate): Observable<Practitioner> {
    return this.http.post<Practitioner>(this.apiUrl, practitioner)
      .pipe(tap((created) => this.practitioners.push(created)));
  }

  public updatePractitioner(practitionerUpdate:PractitionerUpdate): Observable<Practitioner> {
    return this.http.put<Practitioner>(`${this.apiUrl}/${practitionerUpdate.id}`, practitionerUpdate).
                pipe(tap(() => {
                  const index = this.practitioners.findIndex(p => p.id === practitionerUpdate.id);
                  if (index !== -1) {
                    let practitioner = this.practitioners[index];
                    this.practitioners[index] = {...practitioner, ...practitionerUpdate};
                  }
              }));
  }

  public deletePractitioner(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        this.practitioners = this.practitioners.filter(p => p.id !== id);
      }));
  }

}
