import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PatientService} from '../patient';
import {Patient} from '../models/patient.interface';

@Component({
  selector: 'app-patient-details',
  imports: [
    RouterLink
  ],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css',
})
export class PatientDetails implements OnInit {

    private route: ActivatedRoute = inject(ActivatedRoute);
    private id: string| null = null;
    private patientService: PatientService = inject(PatientService);
    private router:Router = inject(Router);
    public patient: Patient | undefined;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.patientService.getPatientsById(parseInt(this.id)).subscribe(patient => {
        this.patient = patient;
      });
    }
  }

  public onDelete(id: number | undefined): void {
    if (typeof id === 'undefined') {
      throw Error('Not implemented');
    }
    this.patientService.deletePatient(id).subscribe(() => this.router.navigate(['patients']) );
  }
}
