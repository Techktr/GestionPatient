import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm {

  private formBuilder: FormBuilder = inject(FormBuilder);
  public patientForm: FormGroup = this.formBuilder.group({name: ['',Validators.required],firstname: ['',Validators.required],age: [1,Validators.required],sport: ['',Validators.required],address: ['']});

  public submit(){
    if(this.patientForm.valid){
      console.log(this.patientForm.value);
    }
    else {
      console.error("Le formulaire n'est pas valide")
    }
  }
}
