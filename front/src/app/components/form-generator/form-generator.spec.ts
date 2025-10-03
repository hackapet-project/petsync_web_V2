import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenerator } from './form-generator';

describe('FormGenerator', () => {
  let component: FormGenerator;
  let fixture: ComponentFixture<FormGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
