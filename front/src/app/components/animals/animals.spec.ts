import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Animals } from './animals';
import { AnimalsService } from '../../core/services/animals/animals';

describe('Animals', () => {
  let component: Animals;
  let fixture: ComponentFixture<Animals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animals],
      providers: [
        {
          provide: AnimalsService,
          useValue: {
            getAll: () => of([]),
            create: () => of(),
          }
        },
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open'),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
