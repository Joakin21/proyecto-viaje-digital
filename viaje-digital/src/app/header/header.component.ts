import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../servicios/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '.../../node_modules/@ngx-translate/core'
import {ConexionBackendService} from '../servicios/conexion-backend.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userName: string;

  //@Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UserService, public translate: TranslateService, private conexBack: ConexionBackendService) { }

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
