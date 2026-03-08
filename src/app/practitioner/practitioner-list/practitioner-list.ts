import {Component, inject, OnInit} from '@angular/core';
import {PractitionerService} from '../practitioner';
import {Practitioner} from '../models/practitioner.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-practitioner-list',
  imports: [
    RouterLink
  ],
  templateUrl: './practitioner-list.html',
  styleUrl: './practitioner-list.css',
})
export class PractitionerList implements OnInit {
  private practitionerService: PractitionerService = inject(PractitionerService);
  public practitioners: Practitioner[] = [];

  ngOnInit(): void {
    this.practitionerService.getPractitioners().subscribe(practitioners => {
      this.practitioners = practitioners;
    });
  }


}
