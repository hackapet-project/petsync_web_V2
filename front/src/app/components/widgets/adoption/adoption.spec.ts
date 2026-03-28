import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adoption } from './adoption';

describe('Adoption', () => {
  let component: Adoption;
  let fixture: ComponentFixture<Adoption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adoption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adoption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
