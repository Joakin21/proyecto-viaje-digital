import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { FichaPacienteComponent } from './ficha-paciente/ficha-paciente.component';
import { DiagramaArquetiposComponent } from './diagrama-arquetipos/diagrama-arquetipos.component';

import { RouterModule, Routes } from '@angular/router';
import { CamposComponent } from './campos/campos.component';
import { ListaArquetiposComponent } from './lista-arquetipos/lista-arquetipos.component';

const routes: Routes = [

  //{path:'login', component: LoginComponent},
  //{path:'inicio', component: InicioComponent},
  {path:'ficha-paciente', component: FichaPacienteComponent},
  //{path:'diagrama', component: DiagramaArquetiposComponent},
  //{path: '', component: LoginComponent, pathMatch: 'full'},
  {path: '', component: FichaPacienteComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    FichaPacienteComponent,
    DiagramaArquetiposComponent,
    CamposComponent,
    ListaArquetiposComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
