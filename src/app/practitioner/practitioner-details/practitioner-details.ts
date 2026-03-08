import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PractitionerService} from '../practitioner';
import {Practitioner} from '../models/practitioner.interface';

@Component({
  selector: 'app-practitioner-details',
  imports: [RouterLink],
  templateUrl: './practitioner-details.html',
  styleUrl: './practitioner-details.css',
})
export class PractitionerDetails implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: string| null = null;
  private router:Router = inject(Router);
  private practitionerService: PractitionerService = inject(PractitionerService);
  public practitioner: Practitioner | undefined;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id !== null) {
      this.practitionerService.getPractitioner(parseInt(this.id)).subscribe(practitioner => {this.practitioner = practitioner;});
    }
  }

  public onDelete(id: number | undefined): void {
    if (typeof id === 'undefined') {
      throw Error('Not implemented');
    }
    this.practitionerService.deletePractitioner(id).subscribe(() => this.router.navigate(['practitioners']) );
  }

}
