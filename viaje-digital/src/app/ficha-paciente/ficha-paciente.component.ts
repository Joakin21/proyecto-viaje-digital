import { Component, OnInit, ViewChild } from '@angular/core';

import {ConexionBackendService} from '../servicios/conexion-backend.service'
import {NgForm, FormGroup} from '@angular/forms';
import { Validators } from "@angular/forms";
import {FieldConfig} from '../field.interface'
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";
import {Router} from '@angular/router';
import { UserService } from '../servicios/user.service';

declare var $:any;

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css']
})
export class FichaPacienteComponent implements OnInit {

  constructor(private conexBack: ConexionBackendService, private router: Router, private userService: UserService) { }
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
      type: "textarea",
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

  //datos_historial_correctos:boolean = false
  submit(value: any) {

    console.log(value)
    //this.datos_historial_correctos = true
    $(".alert").alert()

  }
  usuario_logeado:string = ""
  ngOnInit(): void {
    if(!this.userService.getToken()){//si no hay token
      this.router.navigateByUrl('')
    }
    
    //Apenas inicia el componente obtenemos el usuario
    this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        this.usuario_logeado = data.username
        console.log(data)
      },
      error => {
        console.log('error', error)
      }
    );
  }

  agregarCampo(datos_campo:any){
    var elemento
    
    var nombre = datos_campo.text
    var tipo = datos_campo.tipo
    //console.log(datos_campo.contenido.lengt)
    if((tipo == "DV_CODED_TEXT" || tipo == "CHOICE") && datos_campo.contenido.length > 0){
      //Si es de tipo choice, eliminamos contenido no deseado
      if (tipo == "CHOICE"){
        for(let i = 0; i < datos_campo.contenido.length; i++){
          var text = datos_campo.contenido[i]["text"]
          if(text == "DV_TEXT" || text == "DV_CODED_TEXT" || text == "DV_COUNT" ||
          text == "DV_QUANTITY" || text == "DV_INTERVAL<DV_QUANTITY>" || text == "DV_URI" ||
          text == "DV_DURATION" || text == "DV_IDENTIFIER" || text == "ELEMENT" || text == "CLUSTER" || 
          text == "DV_DATE_TIME" || text == "DV_INTERVAL<DV_DATE_TIME>"){
            datos_campo.contenido.splice(i, 1)
            i--
          }
        }
      }
      if (datos_campo.contenido.length == 0){//si nos quedamos sin contenido para los radio buttons
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
      else{
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
      }
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
    else if(tipo == "estructural"){
      elemento = {
        type: "titulo_estructural",
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
    else if(tipo == "CLUSTER"){
      var contiene_otros_nodos = false
      for(var k in datos_campo){
        if (typeof datos_campo[k] == "object" && datos_campo[k] !== null && !Array.isArray(datos_campo[k])){
          contiene_otros_nodos = true
        }
      }
      if (contiene_otros_nodos){
        elemento = {
          type: "titulo_estructural",
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
      }else{
        elemento = {
          //type: "input",
          type: "textarea",
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

    }
    else{
      //puede ser un dv_text, careflow step, event, cluster
      elemento = {
        //type: "input",
        type: "textarea",
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
            if(arquetipo[k]["tipo"] != "estructural" && arquetipo[k]["tipo"] != "info"){
              this.agregarCampo(arquetipo[k])
            }else if (arquetipo[k]["tipo"] == "estructural"){
              //volover recorrer con el for
              var es_nodo_info = false
              for (var nodo_siguiente in arquetipo[k]){
                if (typeof arquetipo[k][nodo_siguiente] == "object" && arquetipo[k][nodo_siguiente] !== null && !Array.isArray(arquetipo[k][nodo_siguiente])){
                  if(arquetipo[k][nodo_siguiente]["tipo"] == "info"){
                    es_nodo_info = true
                  }
                }
              }
              if (!es_nodo_info){
                this.agregarCampo(arquetipo[k])
              }
              
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
