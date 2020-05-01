import { Component, OnInit, ViewChild } from '@angular/core';

import {ConexionBackendService} from '../servicios/conexion-backend.service'
import {NgForm, FormGroup} from '@angular/forms';
import { Validators } from "@angular/forms";
import {FieldConfig} from '../field.interface'
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css']
})
export class FichaPacienteComponent implements OnInit {

  constructor(private conexBack: ConexionBackendService) { }
  mostrar_diagrama_arquetipos:boolean = false

  @ViewChild(DynamicFormComponent, {static: true}) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Nombre",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "nombre es obligatorio"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Apellidos",
      inputType: "text",
      name: "apellido",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Apellido es obligarorio"
        }
      ]
    },
    {
      type: "input",
      label: "Dirección",
      inputType: "text",
      name: "direccion",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "dirección es obligarorio"
        }
      ]
    },
    /*{
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },*/
    {
      type: "date",
      label: "Fecha de nacimiento",
      name: "fecha",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      type: "select",
      label: "Ciudad",
      name: "ciudad",
      value: "Temuco",
      options: ["Iquique", "Antofagasta", "Copiapó", "Arica",
                "Coyhaique","Concepción"," La Serena","Temuco",
                "Puerto Montt","Valdivia","Punta Arenas","Talca",
                "Santiago","Chillán","Rancagua","Valparaíso", "Santiago"]
    },
    {
      type: "button",
      label: "Save"
    }
   
  ];

  submit(value: any) {

    console.log(value)

  }

  ngOnInit(): void {
  }
  agregarCampo(datos_campo:any){
    var elemento
    
    var nombre = datos_campo.text
    var tipo = datos_campo.tipo
    //console.log(datos_campo.contenido.lengt)
    if((tipo == "DV_CODED_TEXT" || tipo == "CHOICE") && datos_campo.contenido.length > 0){
      //creamos el radio button
      var myOptions = []
      for(const opt of datos_campo.contenido){
        myOptions.push(opt.text)
      }
      elemento = {
        type: "radiobutton",
        label: nombre,
        name: nombre,
        options: myOptions
      }
      console.log("Es choice, hay que hacer radio buttons")
    }

    else if(tipo == "DV_QUANTITY" || tipo == "DV_COUNT"){
      elemento = {
        type: "input",
        label: nombre,
        inputType: "number",
        name: nombre,
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: nombre + " es obligarorio"
          }
        ]
      }
    }
    else if(tipo == "DV_ORDINAL"){
      var myOptions = []
      for(const opt of datos_campo.contenido){
        myOptions.push(opt.numero + ": " + opt.text)
      }
      elemento = {
        type: "select",
        label: nombre,
        name: nombre,
        options: myOptions
      }
    }
    else if(tipo == "DV_DATE_TIME" || tipo == "DV_DATE"){
      elemento = {
        type: "date",
        label: nombre,
        name: nombre,
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: nombre + " es obligarorio"
          }
        ]
      }
    }
    else if(tipo == "DV_BOOLEAN"){
      elemento = {
        type: "select",
        label: nombre,
        name: nombre,
        options: ["Yes", "No"]
      }
    }
    /*else if(tipo == "estructural"){
      alert("llego un estructural!")
    }*/
    else{
      //puede ser un dv_text, careflow step, event, cluster
      elemento = {
        type: "input",
        label: nombre,
        inputType: "text",
        name: nombre,
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: nombre + " es obligarorio"
          }
        ]
      }
      
    }
    this.form.agregarBoton(elemento)

  }
  agregarAlHistorial(arquetipo){ 
    for (var k in arquetipo)
    {    
        if (typeof arquetipo[k] == "object" && arquetipo[k] !== null && !Array.isArray(arquetipo[k])){
            //para agregar titulos
            /*if(arquetipo[k]["tipo"] == "estructural" && arquetipo[k]["text"] == "items"){
              
              var formulario = document.getElementById("myForm")
              var titulo_estructural = document.createElement("h4")
              titulo_estructural.innerText = arquetipo["text"]
              formulario.appendChild(titulo_estructural)
            }*/
            //Para agregar campos:
            if(/*arquetipo[k]["tipo"] != "estructural" && */arquetipo[k]["tipo"] != "info"){
              this.agregarCampo(arquetipo[k])
            }
            
            this.agregarAlHistorial(arquetipo[k]); 
        }
    }

  }

  asignarBotonTitulo(arquetipo:any){

    var nombre_arquetipo = arquetipo["text"]
    var elemento = {
      type: "titulo_arquetipo",
      label: "Arquetipo",
      inputType: "text",
      name: nombre_arquetipo,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: nombre_arquetipo + " es obligarorio"
        }
      ]
    }
    this.form.agregarBoton(elemento)
  }

  recibirArquetipoId(arquetipo_id: string){
    console.log("ID Recibido prro!")
    console.log(arquetipo_id)

    if(arquetipo_id){
      this.conexBack.getArquetipoById(arquetipo_id).subscribe(arquetipo =>{
        this.asignarBotonTitulo(arquetipo),
        this.agregarAlHistorial(arquetipo)
        
      })
    }
    
  }

  cambiarComponente(mensaje: boolean){
    this.mostrar_diagrama_arquetipos = mensaje
    console.log("mensaje recibido :)")
    console.log( this.mostrar_diagrama_arquetipos)
  }
}
