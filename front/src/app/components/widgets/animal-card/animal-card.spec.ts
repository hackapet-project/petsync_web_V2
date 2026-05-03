import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { AnimalCard } from './animal-card';
import { UsersService } from '@app/core/services/users/users';
import { Adoptions } from '@app/core/services/adoptions/adoptions';

describe('AnimalCard', () => {
  let component: AnimalCard;
  let fixture: ComponentFixture<AnimalCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalCard],
      providers: [
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

    fixture = TestBed.createComponent(AnimalCard);
    fixture.componentRef.setInput('animal', {
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
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
