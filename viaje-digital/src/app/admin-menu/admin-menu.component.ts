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
  }
  //funcion momentanea, solo para hacer pruebas
  logout(){
    //alert(this.userName)
    this.userService.logout()
    this.router.navigateByUrl('')
  }

}
