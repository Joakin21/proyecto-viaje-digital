import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../servicios/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '.../../node_modules/@ngx-translate/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userName: string;

  constructor(private router: Router, private userService: UserService, public translate: TranslateService) { }

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
  cambiarIdioma(language:string){
    //alert("Se cambiara a "+language)
    this.translate.use(language)
    
  }
}
