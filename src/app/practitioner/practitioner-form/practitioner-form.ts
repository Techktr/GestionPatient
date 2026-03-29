import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {PractitionerService} from '../practitioner';
import {ActivatedRoute, Router } from "@angular/router";
import {Practitioner} from '../models/practitioner.interface';
import {PractitionerUpdate} from '../models/practitioner-update.interface';

@Component({
  selector: 'app-practitioner-form',
  imports: [ReactiveFormsModule],
  templateUrl: './practitioner-form.html',
  styleUrl: './practitioner-form.css',
})
export class PractitionerForm {
  private formBuilder: FormBuilder = inject(FormBuilder);
  public practitionerForm: FormGroup = this.formBuilder.group({firstName: ['', Validators.required], lastName: ['', Validators.required], speciality: ['', Validators.required], address: ['', Validators.required]});
  private practitionerService: PractitionerService = inject(PractitionerService);
  private router:Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected id: string| null = null;

  public submit () {
    if(this.practitionerForm.valid){
      if (this.id){
        let practitioner: Practitioner = {id: parseInt(this.id), ...this.practitionerForm.value}
        let practitionerUptade: PractitionerUpdate = {id: practitioner.id, address: practitioner.address, speciality: practitioner.speciality};
        this.practitionerService.updatePractitioner(practitionerUptade).subscribe(() => this.router.navigate(['practitioners',this.id]));
      }
      else {
        this.practitionerService.addPractitioner(this.practitionerForm.value).subscribe(() => this.router.navigate(['practitioners']));
      }
    }
    else {
      console.log("Le formulaire n'est pas valide");
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.practitionerService.getPractitioner(parseInt(this.id)).subscribe(practitioner => {
        if(practitioner){
          return this.practitionerForm.patchValue(practitioner);
        }
      });
    }
  }
}
