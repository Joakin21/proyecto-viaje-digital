import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionBackendService } from '../servicios/conexion-backend.service'
import { TranslateService } from '.../../node_modules/@ngx-translate/core'

declare var $: any;

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, public translate: TranslateService, private conexBack: ConexionBackendService) { }

  menu_abierto: boolean = true
  admin = {}
  option_selected = 1

  language_form: FormGroup
  application_language: string = ""

  ngOnInit(): void {
    if (!this.userService.getToken()) {//si no hay token
      this.router.navigateByUrl('')
    }
    this.userService.getAdmin(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        //Si el usuario es admin, debe ser redirigido a una pagina que le corresponda, esta es para los usuarios finales
        var is_admin = data.is_staff
        if (!is_admin) {
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

    this.conexBack.getCurrentLanguage().subscribe(
      data => {
        //console.log(data)

        var current_language = data["language"]
        this.language_form = this.formBuilder.group({
          language: [current_language, Validators.required]
        })
        this.application_language = current_language
      },
      error => {
        console.log('error', error)
      }
    );

  }

  menuToggle(open: boolean) {
    this.menu_abierto = open
    $("#wrapper").toggleClass("toggled");
  }

  optionMenu(option: number) {
    this.option_selected = option

  }

  changeLanguage() {
    var language_selected = this.language_form.value
    console.log(language_selected)
    this.conexBack.changeLanguage(language_selected).subscribe(
      resp => {
        this.translate.setDefaultLang(language_selected["language"])
        this.translate.use(language_selected["language"])
        this.application_language = language_selected["language"]

        $("#success-alert").show();
        window.setTimeout(function () {
          $("#success-alert").hide();
        }, 4000);

      },
      error => {
        console.log('error', error)
      }
    );
  }

  goToArchetypeEditor() {
    window.open("http://localhost:4201/", '_blank');
  }

  logout() {
    this.userService.logout()
    this.router.navigateByUrl('')
  }

}
