import {ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {AppointmentService} from '../appointment';
import {Appointment} from '../models/appointment.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
    private appointmentService: AppointmentService = inject(AppointmentService);
    public appointments: Appointment[] = [];
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.appointmentService.getAppointments().subscribe(appointments => {
          this.appointments = appointments;
          this.cdr.detectChanges();
        });
    }

}
