import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerForm } from './practitioner-form';

describe('PractitionerForm', () => {
  let component: PractitionerForm;
  let fixture: ComponentFixture<PractitionerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
