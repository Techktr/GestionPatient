import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PatientService} from '../patient';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../patient.interface';


@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  public patientForm: FormGroup = this.formBuilder.group({name: ['',Validators.required],firstname: ['',Validators.required],age: [1,Validators.required],sport: ['',Validators.required],address: ['']});
  private patientService: PatientService = inject(PatientService);
  private router:Router = inject(Router);
  protected readonly FormControl = FormControl;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: string| null = null;
  private changeDetectorRef:ChangeDetectorRef = inject(ChangeDetectorRef);

  public submit() {
    if (this.patientForm.valid) {
      if (this.id) {

        let patient: Patient = {id: parseInt(this.id), ...this.patientForm.value};
        this.patientService.updatePatient(patient);
        this.router.navigate(['patients',this.id]);
        this.changeDetectorRef.detectChanges();
      }
      else {

        this.patientService.addPatient(this.patientForm.value);
        this.router.navigate(['patients']);
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
