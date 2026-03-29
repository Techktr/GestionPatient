import {ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {AppointmentService} from '../appointment';
import {Appointment} from '../models/appointment.interface';

@Component({
  selector: 'app-appointment-details',
  imports: [RouterLink],
  templateUrl: './appointment-details.html',
  styleUrl: './appointment-details.css',
})
export class AppointmentDetails implements OnInit {

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: string| null = null;
  private router:Router = inject(Router);
  private appointmentService: AppointmentService = inject(AppointmentService);
  public appointment: Appointment | undefined;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id !== null) {
      this.appointmentService.getAppointment(parseInt(this.id)).subscribe(appointment => {
        this.appointment = appointment;
        this.cdr.detectChanges();
      });
    }
  }

  public onDelete(id: number | undefined): void {
    if (typeof id === 'undefined') {
      throw Error('Not implemented');
    }
    this.appointmentService.deleteAppointment(id).subscribe(() => this.router.navigate(['appointments']));
  }

}
