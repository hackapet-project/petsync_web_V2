import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { AnimalDetail } from './animal-detail';
import { AnimalsService } from '../../core/services/animals/animals';
import { UsersService } from '../../core/services/users/users';
import { Adoptions } from '../../core/services/adoptions/adoptions';

describe('AnimalDetail', () => {
  let component: AnimalDetail;
  let fixture: ComponentFixture<AnimalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'animal-id',
              },
            },
          },
        },
        {
          provide: AnimalsService,
          useValue: {
            getById: () => of({
              id: 'animal-id',
              shelterId: 'shelter-id',
              state: 'rescued',
              name: 'Luna',
              species: 'dog',
              breed: 'Mestiza',
              gender: 'female',
              size: 'medium',
              weight: '12 kg',
              weightValue: 12,
              age: '2 years',
              chip: '123',
              birthDate: '2024-01-01',
              intakeDate: '2026-01-01',
              outcomeDate: null,
              microchipped: true,
              sterilized: true,
              vaccinated: true,
              medicalNotes: '',
              allergies: '',
              lastVetVisit: null,
              temperament: '',
              behaviorNotes: '',
            }),
            update: () => of(),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open'),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getAll: () => of([]),
          },
        },
        {
          provide: Adoptions,
          useValue: {
            create: () => of(),
          },
        },
      ],
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
