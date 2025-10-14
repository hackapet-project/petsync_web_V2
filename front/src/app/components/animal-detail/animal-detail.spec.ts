import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetail } from './animal-detail';

describe('AnimalDetail', () => {
  let component: AnimalDetail;
  let fixture: ComponentFixture<AnimalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
