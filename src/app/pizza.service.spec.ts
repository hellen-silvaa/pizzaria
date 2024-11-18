import { TestBed } from '@angular/core/testing';

import { PizzaService } from './services/pizza.service';

describe('PizzaService', () => {
  let service: PizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
