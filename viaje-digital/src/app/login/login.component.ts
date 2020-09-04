import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../servicios/user.service';

//para cambiar el color de toda la pagina
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, @Inject(DOCUMENT) private _document) { }
  mostrar_error: boolean = false
  mensaje_login: string

  ngOnInit(): void {
    this._document.body.style.background = '#FFFFFF';
    if (this.userService.getToken() && this.userService.getIdUser()) {//el usuario ya esta logeado

      //Intentamos obtener al usuario profesional salud
      var try_go_admin_menu = false
      this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
        data => {
          var is_admin = data.user.is_staff
          if (!is_admin) {
            this.goToInicio()
          }
        },
        error => {
          try_go_admin_menu = true
          this.userService.getAdmin(parseInt(this.userService.getIdUser())).subscribe(
            data => {
              var is_admin = data.is_staff
              if (is_admin) {
                this.goToAdminMenu()
              }
            },

          );
        }
      );
    }
  }
  login(credenciales: NgForm) {
    var credenciales_ingresadas = credenciales.valid
    if (credenciales_ingresadas) {
      console.log(credenciales.value)
      this.userService.login(credenciales.value).subscribe(
        data => {
          console.log(data)
          this.mostrar_error = false
          this.userService.setToken(data.token)

          var is_admin = data.is_admin
          this.userService.setIdUser(data.user_id.toString())
          if (is_admin) {
            this.goToAdminMenu()
          }
          else {
            this.goToInicio()
          }
        },
        error => {
          console.log('error', error),
            this.mostrar_error = true,
            this.mensaje_login = "invalid email or password"
        }
      );
    } else {
      this.mostrar_error = true
      this.mensaje_login = "Please write your email and password"
    }

    console.log(credenciales.valid);
  }
  goToInicio(): void {
    this.router.navigateByUrl('/inicio')
  }
  goToAdminMenu(): void {
    this.router.navigateByUrl('/admin-menu')
  }
}
