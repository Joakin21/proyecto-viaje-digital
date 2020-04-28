import { TestBed } from '@angular/core/testing';

import { SeleccionarArquetipoService } from './seleccionar-arquetipo.service';

describe('SeleccionarArquetipoService', () => {
  let service: SeleccionarArquetipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionarArquetipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
