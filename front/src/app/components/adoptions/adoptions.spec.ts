import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adoptions } from './adoptions';

describe('Adoptions', () => {
  let component: Adoptions;
  let fixture: ComponentFixture<Adoptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adoptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adoptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
