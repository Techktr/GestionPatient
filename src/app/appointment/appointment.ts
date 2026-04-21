import { HttpClient } from "@angular/common/http";
import {inject, Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import {AppointmentCreate} from './models/appointment-create.interface';
import {AppointmentUpdate} from './models/appointment-update.interface';
import {Appointment} from './models/appointment.interface';
import { API_BASE_URL } from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http: HttpClient = inject(HttpClient);
  private readonly urlApi:string = `${API_BASE_URL}/appointment`;
  private appointments: Appointment[] = [];

  public getAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.urlApi).pipe(tap((appointments) => this.appointments = appointments));
  }

  public getAppointment(id: number): Observable<Appointment | undefined> {
    return this.http.get<Appointment | undefined>(`${this.urlApi}/${id}`);
  }

  public addAppointment(appointment: AppointmentCreate): Observable<Appointment>{
    return this.http.post<Appointment>(this.urlApi, appointment)
      .pipe(tap((appointment: Appointment) => this.appointments.push(appointment)));
  }

  public updateAppointment(appointmentUpdate: AppointmentUpdate): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.urlApi}/${appointmentUpdate.id}`, appointmentUpdate)
      .pipe(tap(() => {
        const index = this.appointments.findIndex(appointment => appointment.id === appointmentUpdate.id);
        if (index !== -1) {
          let appointment = this.appointments[index];
          this.appointments[index] = {...appointment, ...appointmentUpdate};
        }
      }));
  }

  public deleteAppointment(id:number):Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`)
      .pipe(tap(() => {this.appointments = this.appointments.filter(a => a.id !== id)}));
  }

}
