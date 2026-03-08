import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerDetails } from './practitioner-details';

describe('PractitionerDetails', () => {
  let component: PractitionerDetails;
  let fixture: ComponentFixture<PractitionerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
