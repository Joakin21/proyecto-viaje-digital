import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { UserService } from '../servicios/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
  mostrar_error:boolean = false
  mensaje_login:string

  ngOnInit(): void {
    if(this.userService.getToken()){//si tiene el token de sesion
      //this.router.navigateByUrl('/ficha-paciente')
      //si tiene el token con el id_user ir a inicio, si no lo tiene ir al adminMenu
      //console.log("Token id_user:")
      if(this.userService.getIdUser()){
        this.goToInicio()
      }
      else{
        this.goToAdminMenu()
      }
      
    }
  }
  login(credenciales: NgForm){
    var credenciales_ingresadas = credenciales.valid
    if (credenciales_ingresadas){
      
      //llamamos a la api
      console.log(credenciales.value)
      this.userService.login(credenciales.value).subscribe(
        data => {
          console.log(data)
          this.mostrar_error = false
          this.userService.setToken(data.token)

          var is_admin = data.is_admin
          if (is_admin){
            this.goToAdminMenu()
          }
          else{
            this.userService.setIdUser(data.user_id.toString())
            this.goToInicio()
          }
        },
        error => {
          console.log('error', error),
          this.mostrar_error = true,
          this.mensaje_login = "invalid email or password"
        }
      );
      //alert("Bienvenido "+f.value.email)
    }else{
      this.mostrar_error = true
      this.mensaje_login = "Please write your email and password"
    }
    
    console.log(credenciales.valid);
  }
  goToInicio(): void{
    //this.router.navigateByUrl('/ficha-paciente')//luego cambiar por pagina de inicio
    this.router.navigateByUrl('/inicio')
  }
  goToAdminMenu():void{
    this.router.navigateByUrl('/admin-menu')
  }
}
