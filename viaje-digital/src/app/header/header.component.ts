import { Component, Input } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  @Input() userName: string;

  constructor(private router: Router, private userService: UserService, private seleccionarPacienteService: SeleccionarPacienteService) { }

  logout() {
    this.userService.logout()
    this.router.navigateByUrl('')
  }

  goHome() {
    this.router.navigateByUrl('/inicio')
  }

  createNewPatient() {
    this.seleccionarPacienteService.asignar("new_patient")
    this.router.navigateByUrl('/ficha-paciente')
  }

  goToArchetypeEditor() {
    window.open("http://localhost:4201/", '_blank');
  }

}
