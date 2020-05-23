import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionarPacienteService {

  private messageSource = new BehaviorSubject(null);
  currentPaciente = this.messageSource.asObservable();

  constructor() { }

  asignar(message: any) {
    this.messageSource.next(message)
  }

}
