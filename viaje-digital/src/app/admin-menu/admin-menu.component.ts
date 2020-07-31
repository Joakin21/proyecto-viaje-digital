import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../servicios/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  menu_abierto:boolean = true
  admin = {}
  option_selected = 1

  language_form:FormGroup

  ngOnInit(): void {
    if(!this.userService.getToken()){//si no hay token
      this.router.navigateByUrl('')
    }
    this.userService.getAdmin(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        //this.usuario_logeado = data.user.first_name + " " + data.user.last_name//data.user.username
        //Si el usuario es admin, debe ser redirigido a una pagina que le corresponda, esta es para los usuarios finales
        var is_admin = data.is_staff
        if(!is_admin){
          this.router.navigateByUrl('')
        }
        this.admin = data
        console.log(this.admin["first_name"] + " " + this.admin["last_name"])
        //var id_profesional = data.user.id
      },
      error => {
        console.log('error', error)
        this.router.navigateByUrl('')
      }
    );

    $("#wrapper").toggleClass("toggled");

  }
  
  menuToggle(open:boolean){
    this.menu_abierto = open
    $("#wrapper").toggleClass("toggled");
  }

  optionMenu(option:number){
    this.option_selected = option
  }

  logout(){
    this.userService.logout()
    this.router.navigateByUrl('')
  }

}
