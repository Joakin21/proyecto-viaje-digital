import { TestBed } from '@angular/core/testing';

import { SeleccionarPacienteService } from './seleccionar-paciente.service';

describe('SeleccionarPacienteService', () => {
  let service: SeleccionarPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionarPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
