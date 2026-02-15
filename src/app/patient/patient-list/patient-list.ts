import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {PatientService} from '../patient';
import {Patient} from '../patient.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-patient-list',
  imports: [RouterLink],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit {
  private patientService: PatientService = inject(PatientService);
  public patients: Patient[] = [];
  private changeDetectorRef:ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log(this.patients);
    this.patientService.getPatients().subscribe(patients => {
      console.log(patients);
      this.patients = patients;
      this.changeDetectorRef.detectChanges();
    });
  }

}
