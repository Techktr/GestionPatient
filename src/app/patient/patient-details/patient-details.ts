import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../patient';
import {Patient} from '../patient.interface';

@Component({
  selector: 'app-patient-details',
  imports: [],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css',
})
export class PatientDetails implements OnInit {

    private route: ActivatedRoute = inject(ActivatedRoute);
    private id: string| null = null;
    private patientService: PatientService = inject(PatientService);
    private changeDetectorRef:ChangeDetectorRef = inject(ChangeDetectorRef);
    public patient: Patient | undefined;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.patientService.getPatientsById(parseInt(this.id)).subscribe(patient => {
        this.patient = patient;
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
