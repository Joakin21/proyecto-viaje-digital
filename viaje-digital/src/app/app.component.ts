import { Component } from '@angular/core';
import {TranslateService} from '../../node_modules/@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'viaje-digital';

  constructor(public translate: TranslateService){
    this.translate.addLangs(['es','en'])
    this.translate.setDefaultLang('es')
    this.translate.use('en')
    //this.translate.currentLang
  }
}
