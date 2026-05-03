import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Adoptions } from './adoptions';
import { Adoptions as AdoptionsService } from '@app/core/services/adoptions/adoptions';
import { AnimalsService } from '@app/core/services/animals/animals';

describe('Adoptions', () => {
  let component: Adoptions;
  let fixture: ComponentFixture<Adoptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adoptions],
      providers: [
        {
          provide: AdoptionsService,
          useValue: {
            getAll: () => of([]),
            updateState: () => of(),
          },
        },
        {
          provide: AnimalsService,
          useValue: {
            getAll: () => of([]),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open'),
          },
        },
      ],
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
