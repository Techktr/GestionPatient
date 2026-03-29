import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PatientService} from '../patient';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../models/patient.interface';
import {PatientUpdate} from '../models/patient-update.interface';


@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  public patientForm: FormGroup = this.formBuilder.group({lastName: ['',Validators.required],firstName: ['',Validators.required],age: [1,Validators.required],sportName: ['',Validators.required],address: ['']});
  private patientService: PatientService = inject(PatientService);
  private router:Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected id: string| null = null;

  public submit() {
    if (this.patientForm.valid) {
      if (this.id) {
        let patient: Patient = {id: parseInt(this.id), ...this.patientForm.value};
        let patientUpdate: PatientUpdate= {id: patient.id, age: patient.age, sportName: patient.sportName, address: patient.address};
        this.patientService.updatePatient(patientUpdate).subscribe(() => this.router.navigate(['patients',this.id]));
      }
      else {
        this.patientService.addPatient(this.patientForm.value).subscribe(() => this.router.navigate(['patients']));
      }
    }
    else {
      console.error("Le formulaire n'est pas valide");
    }
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.patientService.getPatientsById(parseInt(this.id)).subscribe(patient => {
        if(patient){
          return this.patientForm.patchValue(patient);
        }
      });
    }
  }


}
