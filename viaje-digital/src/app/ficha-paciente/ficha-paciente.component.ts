import { Component, OnInit, ViewChild } from '@angular/core';

import {ConexionBackendService} from '../servicios/conexion-backend.service'
import {NgForm, FormGroup} from '@angular/forms';
import { Validators } from "@angular/forms";
import {FieldConfig} from '../field.interface'
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";
import {Router} from '@angular/router';
import { UserService } from '../servicios/user.service';
import { PacienteService } from '../servicios/paciente.service'
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'
import { PdfService } from '../servicios/pdf.service'

declare var $:any;

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css']
})
export class FichaPacienteComponent implements OnInit {

  constructor(private conexBack: ConexionBackendService, private router: Router, private userService: UserService, private patientService: PacienteService, private seleccionarPacienteService: SeleccionarPacienteService, private pdfService:PdfService) { }
  mostrar_diagrama_arquetipos:boolean = false

  patient_journey:any = {}

  current_medical_sesion:any = {}
  arquetipos_medical_sesion:any[] = []
  arquetipo_agregado_historial:any = []//se ira insertando al array arquetipos_medical_sesion
  n:number = 0

  user:any = {}
  habilitar_form_datos_base:boolean = false
  habilitar_creacion_nueva_sesion:boolean = true

  mensaje_error2:string = ""
  mostrar_mensaje_error2:boolean = false

  @ViewChild(DynamicFormComponent, {static: false}) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [//Nos ayudara para agregar nuevas sesiones medicas a la estructura

    /*{
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
    },*/
    {
      type: "button",
      label: "Save"
    }
   
  ];

  mostrar_error:boolean = false
  crearPaciente(datos_base: NgForm){
    var all_datos_ingresados = datos_base.valid
    if(all_datos_ingresados){
      this.mostrar_error = false
      this.patient_journey = datos_base.value
      this.patient_journey["profesionales_que_atendieron"] = []
      this.patient_journey["sesiones_medica"] = []
      //console.log(this.patient  _journey)
      this.showPatientJourney()
    }else{
      this.mostrar_error = true
    }
  }
  mostrar_historial:boolean = false
  showPatientJourney(){
    console.log("Se mostrará el historial del paciente!!")
    console.log(this.patient_journey)
    this.habilitar_form_datos_base = false
    this.mostrar_historial = true
  }
  mensaje_error_create_sesion:boolean = false
  createNewMedicalSesion(sesion_name: NgForm){
    var all_datos_ingresados = sesion_name.valid
    if(all_datos_ingresados){
      $('#modalSetMedicalSesionName').modal('toggle');
      //agregamos datos base de una sesion medica
      this.current_medical_sesion["nombre_sesion"] = sesion_name.value.name
      this.current_medical_sesion["fecha"] = this.obtenerFechaActual()
      this.current_medical_sesion["nombre_profesional"] = this.user.user.first_name + " " + this.user.user.last_name
      this.current_medical_sesion["profesion"] = this.user.profesion
      this.current_medical_sesion["centro_salud"] = this.user.centro_salud
      console.log(this.user)
      /*
      this.patient_journey["sesiones_medica"].push(this.current_medical_sesion)
      console.log(this.patient_journey)
      */
      console.log(this.current_medical_sesion)
      this.habilitar_creacion_nueva_sesion = false
      //dibujamos nuevamente el patient journey
      this.mostrar_mensaje_error2 = false
      this.mensaje_error_create_sesion = false
    }
    else{
      this.mensaje_error_create_sesion = true
    }
    
  }
  obtenerFechaActual():string{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var my_current_date = mm + '/' + dd + '/' + yyyy;
    return my_current_date
  }
  usuario_logeado:string = ""//para pasar al header
  
  ngOnInit(): void {
    if(!this.userService.getToken()){//si no hay token
      this.router.navigateByUrl('')
    }
    
    //Apenas inicia el componente obtenemos el usuario
    this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        this.usuario_logeado = data.user.first_name + " " + data.user.last_name//data.user.username
        this.user = data
        //console.log(data)
      },
      error => {
        console.log('error', error)
      }
    );

    //obtener rut del paciente seleccionado
    this.seleccionarPacienteService.currentPaciente.subscribe(
      rut => {
        if(rut == null){
          this.router.navigateByUrl('/inicio')
        }
        if(rut == "new_patient"){
          //alert("crear nuevo paciente")
          console.log("Crear paciente desde 0")
          console.log(this.patient_journey)
          this.habilitar_form_datos_base = true
          this.mostrar_historial = false
          this.habilitar_creacion_nueva_sesion = true
        }
        else{//rut normal validado que existe
          //alert(rut)
          console.log("modificar paciente:",rut)
          this.patientService.getPatient(rut).subscribe(
            data => {
              this.patient_journey = data
              this.showPatientJourney()
              //console.log(this.patient_journey)
            },
            error => {
              console.log('error', error)
            }
          );
          
        }
        
    })
  }
  
  agregarCampo(datos_campo:any){
    var elemento
    
    var nombre = this.n.toString()//datos_campo.text
    var mylabel = datos_campo.text
    var tipo = datos_campo.tipo

    var nodo_arquetipos_medical_sesion = {}
    //1.- titulo ; 2.- estructural ; 3.- cluster ; 4.- datos paciente
    var tipo_nodo_arquetipos_medical_sesion

    //console.log(datos_campo.contenido.lengt)
    if((tipo == "DV_CODED_TEXT" || tipo == "CHOICE") && datos_campo.contenido.length > 0){

      tipo_nodo_arquetipos_medical_sesion = 4
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
          label: mylabel,
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
          label: mylabel,
          name: nombre,
          options: myOptions
        }
      }
    }

    else if(tipo == "DV_QUANTITY" || tipo == "DV_COUNT"){

      tipo_nodo_arquetipos_medical_sesion = 4

      /*elemento = {
        type: "input",
        label: mylabel,
        inputType: "number",
        name: nombre,
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: nombre + " es obligarorio"
          }
        ]
      }*/
      elemento = {
        type: "input",
        label: mylabel,
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
    else if(tipo == "DV_ORDINAL"){

      tipo_nodo_arquetipos_medical_sesion = 4

      var myOptions = []
      for(const opt of datos_campo.contenido){
        myOptions.push(opt.numero + ": " + opt.text)
      }
      elemento = {
        type: "select",
        label: mylabel,
        name: nombre,
        options: myOptions
      }
    }
    else if(tipo == "DV_DATE_TIME" || tipo == "DV_DATE"){

      tipo_nodo_arquetipos_medical_sesion = 4

      elemento = {
        type: "date",
        label: mylabel,
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

      tipo_nodo_arquetipos_medical_sesion = 4

      elemento = {
        type: "select",
        label: mylabel,
        name: nombre,
        options: ["Yes", "No"]
      }
    }
    else if(tipo == "estructural"){

      tipo_nodo_arquetipos_medical_sesion = 2

      elemento = {
        type: "titulo_estructural",
        label: mylabel,
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

        tipo_nodo_arquetipos_medical_sesion = 3

        elemento = {
          type: "titulo_estructural",
          label: mylabel,
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

        tipo_nodo_arquetipos_medical_sesion = 4

        elemento = {
          //type: "input",
          type: "textarea",
          label: mylabel,
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

      tipo_nodo_arquetipos_medical_sesion = 4

      elemento = {
        //type: "input",
        type: "textarea",
        label: mylabel,
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
    nodo_arquetipos_medical_sesion["tipo"] = tipo_nodo_arquetipos_medical_sesion
    this.arquetipo_agregado_historial.push(nodo_arquetipos_medical_sesion)
    this.n = this.n+1
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
            if(arquetipo[k]["tipo"] != "estructural" && arquetipo[k]["tipo"] != "info" && arquetipo[k]["text"]){
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
      label: nombre_arquetipo,
      inputType: "text",
      name: this.n.toString(),
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: nombre_arquetipo + " es obligarorio"
        }
      ]
    }
    this.form.agregarBoton(elemento)
    this.arquetipo_agregado_historial.push({"tipo":1})
    this.n = this.n+1
  } 

  recibirArquetipoId(arquetipo_id: string){
    if(!this.habilitar_creacion_nueva_sesion){
      if(arquetipo_id){
        this.conexBack.getArquetipoById(arquetipo_id).subscribe(arquetipo =>{
          this.asignarBotonTitulo(arquetipo),
          this.agregarAlHistorial(arquetipo)
          //console.log(this.arquetipo_agregado_historial)
          //luego de las dos funciones anteriores, el tipo de nodo esta seteado
          this.arquetipos_medical_sesion.push(this.arquetipo_agregado_historial)
          console.log(this.arquetipos_medical_sesion)
          this.arquetipo_agregado_historial = []
        })
      }
      this.mostrar_mensaje_error2 = false
    }else{
      //alert("Para agregar un arquetipo debe crear una sesion primero")
      this.mensaje_error2 = "To add an archetype you must create a session first"
      this.mostrar_mensaje_error2 = true
    }
    
    
  }
  //datos_historial_correctos:boolean = false
  submit(datos_form: any) {

    if(this.arquetipos_medical_sesion.length > 0){
      console.log("Patient Journey:")
      var i = 0
      for(let arquetipo_in_historial of this.arquetipos_medical_sesion){
        for(let nodo of arquetipo_in_historial){
          var nombre_campo = datos_form["nombre_campos"][i]
          var valor_campo = datos_form["valor_campos"][i.toString()]
          if(typeof valor_campo == "object"){
            var fecha = valor_campo["_i"]["date"]+"/"+valor_campo["_i"]["month"]+"/"+valor_campo["_i"]["year"]
            valor_campo = fecha
          }

          //nodo[nombre_campo] = valor_campo
          nodo["clave"] = nombre_campo
          nodo["valor"] = valor_campo
          i = i + 1
        }
        //console.log(arquetipo_in_historial)
      }
      this.current_medical_sesion["arquetipos"] = this.arquetipos_medical_sesion
      this.patient_journey["sesiones_medica"].push(this.current_medical_sesion)
      //agrego el profesional que atendio solo si nunca habia atendido al paciente
      var atendio_al_paciente_antes = false
      for(let id_profesional of this.patient_journey["profesionales_que_atendieron"]){
        if(this.user.user.id == id_profesional){
          atendio_al_paciente_antes = true
        }
      }
      if(!atendio_al_paciente_antes){
        this.patient_journey["profesionales_que_atendieron"].push(this.user.user.id)
      }
      

      
      this.resetDatosCurrentSesionMedica()
      console.log(this.patient_journey["_id"])
      console.log(this.patient_journey)

      if(this.patient_journey["_id"]){//Si hay que actualizar uno ya existente
        //alert("Se actualizara el paciente")
        this.patientService.putPatient(this.patient_journey["rut"], this.patient_journey).subscribe(
          data => {
            console.log(data)
          },
          error => {
            console.log('error', error)
          }
        );
      }else{
        //alert("Se creara el paciente")
        this.patientService.postPatient(this.patient_journey).subscribe(
          data => {
            this.patient_journey["_id"] = data["_id"]
          },
          error => {
            console.log('error', error)
          }
        );
      }
      this.mostrar_mensaje_error2 = false
    }else{
      //alert("Debes agregar almenos un arquetipo a la sesion")
      this.mensaje_error2 = "You must add at least one archetype to the session"
      this.mostrar_mensaje_error2 = true
    }
    

  }
  resetDatosCurrentSesionMedica(){
    this.current_medical_sesion = {}
    this.arquetipos_medical_sesion= []
    this.arquetipo_agregado_historial = []//se ira insertando al array arquetipos_medical_sesion
    this.n = 0
    this.regConfig = [{
      type: "button",
      label: "Save"
    }]
    this.form.resetDatosCurrentSesionMedica()
    this.habilitar_creacion_nueva_sesion = true
    //insertar/ actualizar paciente en DB

  }

  cambiarComponente(mensaje: boolean){
    this.mostrar_diagrama_arquetipos = mensaje
    console.log("mensaje recibido :)")
    console.log( this.mostrar_diagrama_arquetipos)

    window.scroll(0,50);
  }
  closeDiagram(){
    this.mostrar_diagrama_arquetipos = false
  }

  downloadPDF(){
    //here will call the service
    
    this.pdfService.fichaPacienteToPdf(this.patient_journey)
  }
  //@ViewChild('myChild') private myChild: MyChildComponent;
  /*actualizarListaAndDiagramaArquetipos(mensaje: boolean){

  this.mostrar_diagrama_arquetipos = true
  this.mostrar_diagrama_arquetipos = false

  }*/
}
