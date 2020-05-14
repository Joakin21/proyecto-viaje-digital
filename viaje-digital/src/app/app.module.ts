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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module"; 
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { TituloArquetipoComponent } from "./components/titulo-arquetipo/titulo-arquetipo.component";// :)
import { TextareaComponent } from "./components/textarea/textarea.component";
import { TituloEstructuralComponent} from "./components/titulo-estructural/titulo-estructural.component";
import { TituloClusterComponent } from "./components/titulo-cluster/titulo-cluster.component"
import { DynamicFieldDirective } from "./components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

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
    ListaArquetiposComponent,

    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TituloArquetipoComponent,
    TextareaComponent,
    TituloEstructuralComponent,
    TituloClusterComponent,
    DynamicFieldDirective,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,                               
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MaterialModule,

    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TituloArquetipoComponent,
    TextareaComponent,
    TituloEstructuralComponent,
    TituloClusterComponent
  ]
})
export class AppModule { }
