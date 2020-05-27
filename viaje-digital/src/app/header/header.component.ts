import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../servicios/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userName: string;

  constructor(private router: Router, private userService: UserService) { }

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
}
