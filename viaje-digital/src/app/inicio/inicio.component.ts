import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../servicios/user.service';
import { PacienteService } from '../servicios/paciente.service'
import {NgForm} from '@angular/forms';
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'

//para cambiar el color de toda la pagina
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InicioComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, private router: Router, private userService: UserService, private patientService: PacienteService, private seleccionarPacienteService: SeleccionarPacienteService) { }
  
  mensaje_respuesta:string = ""
  mostrar_paciente_encontrado:boolean = false 
  mostrar_error:boolean = false

  usuario_logeado:string = ""
  pacientes_atendidos:any = []
  ngOnInit(): void {
    //this._document.body.classList.add('bodybg-color');
    this._document.body.style.background = '#f6f9fc';
    if(!this.userService.getToken()){//si no hay token
      this.router.navigateByUrl('')
    }
    
    //Apenas inicia el componente obtenemos el usuario
    this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        this.usuario_logeado = data.user.first_name + " " + data.user.last_name//data.user.username
        console.log(data)
        var id_profesional = data.user.id
        this.patientService.getAttendedPatients(id_profesional).subscribe(
          data => {
            
            this.pacientes_atendidos = data["pacientes_atendidos"]
            console.log(this.pacientes_atendidos)
          },
          error => {
            console.log('error', error)
          }
        );
      },
      error => {
        console.log('error', error)
      }
    );
    
  }
  rut:string
  nombre:string
  apellidos:string

  buscarPaciente(paciente: NgForm){
    //alert(usuario.value.rut)
    var rut = paciente.value.rut
    this.patientService.getPatient(rut).subscribe(
      data => {
        //console.log(data)
        if (data["rut"]){//si devolvio un paciente
          this.rut = data["rut"]
          this.nombre = data["nombre"]
          this.apellidos = data["apellidos"]
          this.mostrar_paciente_encontrado = true
          this.mostrar_error = false
        }else{
          this.mensaje_respuesta = data["detail"]
          this.mostrar_paciente_encontrado = false
          this.mostrar_error = true
          
        }
      },
      error => {
        this.mensaje_respuesta = "Patient not found"
        this.mostrar_error = true
        console.log('error', error)
      }
    );
  }

  goToHistory(){
    //alert("ir a ficha!")
    this.seleccionarPacienteService.asignar(this.rut)
    this.router.navigateByUrl('/ficha-paciente')
  }

  seleccionarDesdeLista(paciente:any){
    this.rut = paciente["rut"]
    this.goToHistory()
  }

  createNewPatient(){
    this.seleccionarPacienteService.asignar("new_patient")
    this.router.navigateByUrl('/ficha-paciente')

  }

  ShowRecentlyAttended(){
   
    this.mostrar_paciente_encontrado = false
  }
  ngOnDestroy() {
    // remove the class form body tag
    this._document.body.classList.add('bodybg-color');
  }

}
