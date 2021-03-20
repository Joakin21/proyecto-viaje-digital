import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { PacienteService } from '../servicios/paciente.service'
import { NgForm } from '@angular/forms';
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'

//para cambiar el color de toda la pagina
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

//Spiner
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InicioComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, private router: Router, private userService: UserService, private patientService: PacienteService, private seleccionarPacienteService: SeleccionarPacienteService, private spinner: NgxSpinnerService) { }

  mensaje_respuesta: string = ""
  mostrar_paciente_encontrado: boolean = false
  mostrar_error: boolean = false

  usuario_logeado: string = ""
  pacientes_atendidos: any = []

  mensaje_spiner:string = ""
  
  ngOnInit(): void {

    this._document.body.style.background = '#f6f9fc';
    /** spinner starts on init */

    if (!this.userService.getToken()) {//si no hay token
      this.router.navigateByUrl('')
    }

    //Apenas inicia el componente obtenemos el usuario
    this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        this.usuario_logeado = data.user.first_name + " " + data.user.last_name
        //Si el usuario es admin, debe ser redirigido a una pagina que le corresponda, esta es para los usuarios finales
        var is_admin = data.user.is_staff
        if (is_admin) {
          this.router.navigateByUrl('')
        }

        //console.log(data)
        var id_profesional = data.user.id

        this.mensaje_spiner = "Loading last seen patients..."
        this.spinner.show();
        this.patientService.getAttendedPatients(id_profesional).subscribe(
          data => {

            this.pacientes_atendidos = data["ultimos_pacientes_atendidos"]
            if(this.pacientes_atendidos.length == 0){
              this.pacientes_atendidos = null
            }
            //console.log(this.pacientes_atendidos)
            this.spinner.hide();
          },
          error => {
            console.log('error', error)
            this.router.navigateByUrl('')
            this.pacientes_atendidos = null
            this.spinner.hide();
          }
        );
      },
      error => {
        console.log('error', error)
        this.router.navigateByUrl('')
      }
    );
    

  }

  rut: string
  nombre: string
  apellidos: string
  es_atendido_ahora: boolean

  buscarPaciente(paciente: NgForm) {
    this.spinner.show();
    this.mensaje_spiner = "Searching Patient..."
    var rut = paciente.value.rut
    this.patientService.getPatient(rut).subscribe(
      data => {
        //console.log(data)
        if (data["rut"]) {//si devolvio un paciente
          this.rut = data["rut"]
          this.nombre = data["nombre"]
          this.apellidos = data["apellidos"]
          this.es_atendido_ahora = data["es_atendido_ahora"]
          this.mostrar_paciente_encontrado = true
          this.mostrar_error = false

        } else {
          this.mensaje_respuesta = data["detail"]
          this.mostrar_paciente_encontrado = false
          this.mostrar_error = true

        }
        this.spinner.hide();
      },
      error => {
        this.mensaje_respuesta = "Patient not found"
        this.mostrar_error = true
        console.log('error', error)
        this.spinner.hide();
      }
    );
  }
  /*setEsAtendidoAhora(rut:string, valor: boolean){
    this.patientService.setEsAtendidoAhora(rut, {es_atendido_ahora:valor}).subscribe(
      data => {
      },
      error => {
        console.log('error', error)
      }
    );
  }*/


  goToHistory(paciente: any = {}){
    if(paciente["es_atendido_ahora"] == false || this.es_atendido_ahora == false){
      let rut = paciente["rut"] ?? this.rut
      this.seleccionarPacienteService.asignar(rut)
      //this.setEsAtendidoAhora(rut, true)
      this.router.navigateByUrl('/ficha-paciente')
    }
  }

  createNewPatient() {
    this.seleccionarPacienteService.asignar("new_patient")
    this.router.navigateByUrl('/ficha-paciente')
  }

  ShowRecentlyAttended() {
    this.mostrar_paciente_encontrado = false
  }

  ngOnDestroy() {
    this._document.body.classList.add('bodybg-color');
  }

}
