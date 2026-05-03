import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Volunteers } from './volunteers';
import { SheltersService } from '@app/core/services/shelters/shelters';
import { UsersService } from '@app/core/services/users/users';

describe('Volunteers', () => {
  let component: Volunteers;
  let fixture: ComponentFixture<Volunteers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Volunteers],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: () => of([]),
          },
        },
        {
          provide: SheltersService,
          useValue: {
            getAll: () => of([]),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Volunteers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
