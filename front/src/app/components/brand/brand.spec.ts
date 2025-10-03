import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Brand } from './brand';

describe('Brand', () => {
  let component: Brand;
  let fixture: ComponentFixture<Brand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Brand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Brand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
