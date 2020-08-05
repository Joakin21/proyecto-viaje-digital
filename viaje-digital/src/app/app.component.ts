import { Component,OnInit } from '@angular/core';
import {ConexionBackendService} from './servicios/conexion-backend.service'
import {TranslateService} from '../../node_modules/@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'viaje-digital';

  constructor(public translate: TranslateService, private conexBack: ConexionBackendService){
  }
  ngOnInit(): void {
    //en el fututo, agregar idiomas desde la base de datos tambien
    this.translate.addLangs(['es','en'])
    //Se debe obtener desde la db
    this.conexBack.getCurrentLanguage().subscribe(
      data => {
        //console.log(data)
        this.translate.setDefaultLang(data["language"])
        this.translate.use(data["language"])
      },
      error => {
        console.log('error', error)
      }
    );
    console.log("Holaaaa")
    //this.translate.currentLang
  }
}
