import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if(!this.userService.getToken()){//si no hay token
      this.router.navigateByUrl('')
    }
    this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        //this.usuario_logeado = data.user.first_name + " " + data.user.last_name//data.user.username
        //Si el usuario es admin, debe ser redirigido a una pagina que le corresponda, esta es para los usuarios finales
        /*var is_admin = data.user.is_staff
        console.log("Es admin: ",is_admin)*/
        console.log(data)
        //var id_profesional = data.user.id
      },
      error => {
        console.log('error', error)
        //this.router.navigateByUrl('')
      }
    );

  }
  //funcion momentanea, solo para hacer pruebas
  logout(){
    //alert(this.userName)
    this.userService.logout()
    this.router.navigateByUrl('')
  }

}
