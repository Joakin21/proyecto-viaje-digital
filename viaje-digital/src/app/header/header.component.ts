import { Component,OnInit, Input } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'
import { PacienteService } from '../servicios/paciente.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  @Input() userName: string;

  constructor(private router: Router, private userService: UserService, private seleccionarPacienteService: SeleccionarPacienteService, private patientService: PacienteService) { }

  paciente_en_edicion:string = null

  ngOnInit(): void {
    this.seleccionarPacienteService.currentPaciente.subscribe(
      rut => {
        if(rut != null || rut != "new_patient") {
          this.paciente_en_edicion = rut
        }
      }
    )
  }
  setEsAtendidoAhora(rut:string, valor: boolean){
    if(this.paciente_en_edicion){
      this.patientService.setEsAtendidoAhora(rut, {es_atendido_ahora:valor}).subscribe(
        data => {
        },
        error => {
          console.log('error', error)
        }
      );
    }

  }

  logout() {
    this.setEsAtendidoAhora(this.paciente_en_edicion, false)
    this.userService.logout()
    this.router.navigateByUrl('')
  }

  goHome() {
    this.setEsAtendidoAhora(this.paciente_en_edicion, false)
    this.router.navigateByUrl('/inicio')
  }

  createNewPatient() {
    this.setEsAtendidoAhora(this.paciente_en_edicion, false)
    this.seleccionarPacienteService.asignar("new_patient")
    this.router.navigateByUrl('/ficha-paciente')
  }

  goToArchetypeEditor() {
    window.open("http://localhost:4201/", '_blank');
  }

}
