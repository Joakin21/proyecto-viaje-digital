import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../servicios/user.service';
import {Router} from '@angular/router';
//import {TranslateService} from '.../../node_modules/@ngx-translate/core'
//import {ConexionBackendService} from '../servicios/conexion-backend.service'
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userName: string;

  //@Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();

  //public translate: TranslateService, private conexBack: ConexionBackendService
  constructor(private router: Router, private userService: UserService, private seleccionarPacienteService: SeleccionarPacienteService) { }

  ngOnInit(): void {
  }
  logout(){
    //alert(this.userName)
    this.userService.logout()
    this.router.navigateByUrl('')
  }
  goHome(){
    this.router.navigateByUrl('/inicio')
  }
  createNewPatient(){
    this.seleccionarPacienteService.asignar("new_patient")
    this.router.navigateByUrl('/ficha-paciente')

  }
  goToArchetypeEditor(){
    //alert("I will go to archetype editor :)")
    window.open("http://localhost:4201/", '_blank');
  }
  //NO BORRAR
  /*
  cambiarIdioma(language:string){//La debe usar el admin
    //alert("Se cambiara a "+language)
    this.translate.use(language)

    this.conexBack.cambiarDataBase({"idioma":language}).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log('error', error)
      }
    );
    //this.mostrar_diagrama_arquetipos.emit(false)
  }*/
}
