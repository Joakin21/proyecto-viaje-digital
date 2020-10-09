import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';

import { ConexionBackendService } from '../servicios/conexion-backend.service'
import { NgForm, FormGroup } from '@angular/forms';
import { Validators } from "@angular/forms";
import { FieldConfig } from '../field.interface'
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { PacienteService } from '../servicios/paciente.service'
import { SeleccionarPacienteService } from '../servicios/seleccionar-paciente.service'
import { PdfService } from '../servicios/pdf.service'
import { months } from 'moment';

declare var $: any;

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css']
})
export class FichaPacienteComponent implements OnInit {

  constructor(private conexBack: ConexionBackendService, private router: Router, private userService: UserService, private patientService: PacienteService, private seleccionarPacienteService: SeleccionarPacienteService, private pdfService: PdfService) { }
  mostrar_diagrama_arquetipos: boolean = false

  patient_journey: any = {}

  current_medical_sesion: any = {}
  arquetipos_medical_sesion: any[] = []
  arquetipo_agregado_historial: any = []//se ira insertando al array arquetipos_medical_sesion
  n: number = 0

  user: any = {}
  habilitar_form_datos_base: boolean = false
  habilitar_creacion_nueva_sesion: boolean = true

  mensaje_error2: string = ""

  menu_abierto: boolean = true

  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [//Nos ayudara para agregar nuevas sesiones medicas a la estructura

    {
      type: "button",
      label: "Save"
    }

  ];

  mostrar_error: boolean = false
  error_crear_paciente: string
  crearPaciente(datos_base: NgForm) {
    var all_datos_ingresados = datos_base.valid
    if (all_datos_ingresados) {
      this.mostrar_error = false
      this.patient_journey = datos_base.value
      this.patient_journey["es_atendido_ahora"] = true 
      this.patient_journey["profesionales_que_atendieron"] = []
      this.patient_journey["sesiones_medica"] = []

      this.patientService.postPatient(this.patient_journey).subscribe(
        data => {
          if(data["detail"]){
            this.mostrar_error = true
            this.error_crear_paciente = "the patient's id is already registered"
          }
          else {
            this.mostrar_error = false
            this.patient_journey["_id"] = data["_id"]
            this.showPatientJourney()
          }  
        },
        error => {
          console.log('error', error)
        }
      );

      
    } else {
      this.mostrar_error = true
      this.error_crear_paciente = "Please enter all fields"
    }
  }
  mostrar_historial: boolean = false
  showPatientJourney() {
    this.habilitar_form_datos_base = false
    this.mostrar_historial = true
  }
  mensaje_error_create_sesion: boolean = false
  createNewMedicalSesion(sesion_name: NgForm) {
    var all_datos_ingresados = sesion_name.valid
    if (all_datos_ingresados) {
      $('#modalSetMedicalSesionName').modal('toggle');
      //agregamos datos base de una sesion medica
      this.current_medical_sesion["nombre_sesion"] = sesion_name.value.name
      this.current_medical_sesion["fecha"] = this.obtenerFechaActual()
      this.current_medical_sesion["nombre_profesional"] = this.user.user.first_name + " " + this.user.user.last_name
      this.current_medical_sesion["profesion"] = this.user.profesion
      this.current_medical_sesion["centro_salud"] = this.user.centro_salud
      this.current_medical_sesion["user_id"] = this.user.user.id
      this.habilitar_creacion_nueva_sesion = false
      //dibujamos nuevamente el patient journey
      this.mensaje_error_create_sesion = false
    }
    else {
      this.mensaje_error_create_sesion = true
    }

  }
  obtenerFechaActual(): string {
    let month = {
      "01":"Jan",
      "02":"Feb",
      "03":"Mar",
      "04":"Apr",
      "05":"May",
      "06":"Jun",
      "07":"Jul",
      "08":"Aug",
      "09":"Sep",
      "10":"Oct",
      "11":"Nov",
      "12":"Dec",
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear().toString();

    var my_current_date = dd + '-' + month[mm] + '-' + yyyy.slice(yyyy.length - 2, yyyy.length);//length
    return my_current_date
  }
  usuario_logeado: string = ""//para pasar al header

  ngOnInit(): void {
    if (!this.userService.getToken()) {//si no hay token
      this.router.navigateByUrl('')
    }

    this.userService.getUser(parseInt(this.userService.getIdUser())).subscribe(
      data => {
        this.usuario_logeado = data.user.first_name + " " + data.user.last_name//data.user.username
        this.user = data
        //console.log(this.user)
      },
      error => {
        console.log('error', error)
      }
    );

    //obtener rut del paciente seleccionado
    this.seleccionarPacienteService.currentPaciente.subscribe(
      rut => {
        if (rut == null) {
          this.router.navigateByUrl('/inicio')
        }
        if (rut == "new_patient") {
          this.habilitar_form_datos_base = true
          this.mostrar_historial = false
          this.habilitar_creacion_nueva_sesion = true
        }
        else {
          this.patientService.getPatient(rut).subscribe(
            data => {
              this.patient_journey = data
              //console.log(this.patient_journey)
              this.showPatientJourney()
            },
            error => {
              console.log('error', error)
            }
          );

        }

      })
  }
  setEsAtendidoAhora(valor: boolean){
    let rut = this.patient_journey["rut"]
    if(rut){
      this.patientService.setEsAtendidoAhora(rut, {es_atendido_ahora:valor}).subscribe(
        data => {
        },
        error => {
          console.log('error', error)
        }
      );
    }
  }

  ngOnDestroy() {
    this.setEsAtendidoAhora(false)
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    this.setEsAtendidoAhora(false)
    //$event.returnValue = "Are you sure?";
  }

  agregarCampo(datos_campo: any) {
    var elemento

    var nombre = this.n.toString()//datos_campo.text
    var mylabel = datos_campo.text
    var tipo = datos_campo.tipo

    var nodo_arquetipos_medical_sesion = {}
    //1.- titulo ; 2.- estructural ; 3.- cluster ; 4.- datos paciente
    var tipo_nodo_arquetipos_medical_sesion

    if ((tipo == "DV_CODED_TEXT" || tipo == "CHOICE") && datos_campo.contenido.length > 0) {

      tipo_nodo_arquetipos_medical_sesion = 4
      //Si es de tipo choice, eliminamos contenido no deseado
      if (tipo == "CHOICE") {
        for (let i = 0; i < datos_campo.contenido.length; i++) {
          var text = datos_campo.contenido[i]["text"]
          if (text == "DV_TEXT" || text == "DV_CODED_TEXT" || text == "DV_COUNT" ||
            text == "DV_QUANTITY" || text == "DV_INTERVAL<DV_QUANTITY>" || text == "DV_URI" ||
            text == "DV_DURATION" || text == "DV_IDENTIFIER" || text == "ELEMENT" || text == "CLUSTER" ||
            text == "DV_DATE_TIME" || text == "DV_INTERVAL<DV_DATE_TIME>") {
            datos_campo.contenido.splice(i, 1)
            i--
          }
        }
      }
      if (datos_campo.contenido.length == 0) {//si nos quedamos sin contenido para los radio buttons
        elemento = {
          type: "input",
          label: mylabel,
          inputType: "text",
          name: nombre,

        }
      }
      else {
        var myOptions = []
        for (const opt of datos_campo.contenido) {
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

    else if (tipo == "DV_QUANTITY" || tipo == "DV_COUNT") {

      tipo_nodo_arquetipos_medical_sesion = 4
      elemento = {
        type: "input",
        label: mylabel,
        inputType: "text",
        name: nombre,
      }
    }
    else if (tipo == "DV_ORDINAL") {

      tipo_nodo_arquetipos_medical_sesion = 4

      var myOptions = []
      for (const opt of datos_campo.contenido) {
        myOptions.push(opt.numero + ": " + opt.text)
      }
      elemento = {
        type: "select",
        label: mylabel,
        name: nombre,
        options: myOptions
      }
    }
    else if (tipo == "DV_DATE_TIME" || tipo == "DV_DATE") {

      tipo_nodo_arquetipos_medical_sesion = 4

      elemento = {
        type: "date",
        label: mylabel,
        name: nombre,
      }
    }
    else if (tipo == "DV_BOOLEAN") {

      tipo_nodo_arquetipos_medical_sesion = 4

      elemento = {
        type: "select",
        label: mylabel,
        name: nombre,
        options: ["Yes", "No"]
      }
    }
    else if (tipo == "estructural") {

      tipo_nodo_arquetipos_medical_sesion = 2

      elemento = {
        type: "titulo_estructural",
        label: mylabel,
        inputType: "text",
        name: nombre,
      }
    }
    else if (tipo == "CLUSTER") {
      var contiene_otros_nodos = false
      for (var k in datos_campo) {
        if (typeof datos_campo[k] == "object" && datos_campo[k] !== null && !Array.isArray(datos_campo[k])) {
          contiene_otros_nodos = true
        }
      }
      if (contiene_otros_nodos) {

        tipo_nodo_arquetipos_medical_sesion = 3

        elemento = {
          type: "titulo_estructural",
          label: mylabel,
          inputType: "text",
          name: nombre,
        }
      } else {

        tipo_nodo_arquetipos_medical_sesion = 4

        elemento = {
          //type: "input",
          type: "textarea",
          label: mylabel,
          inputType: "text",
          name: nombre,
        }
      }

    }
    else {
      //puede ser un dv_text, careflow step, event, cluster
      tipo_nodo_arquetipos_medical_sesion = 4
      elemento = {
        //type: "input",
        type: "textarea",
        label: mylabel,
        inputType: "text",
        name: nombre,
      }

    }
    this.form.agregarBoton(elemento)
    nodo_arquetipos_medical_sesion["tipo"] = tipo_nodo_arquetipos_medical_sesion
    this.arquetipo_agregado_historial.push(nodo_arquetipos_medical_sesion)
    this.n = this.n + 1
  }
  agregarAlHistorial(arquetipo) {
    for (var k in arquetipo) {
      if (typeof arquetipo[k] == "object" && arquetipo[k] !== null && !Array.isArray(arquetipo[k])) {
        //Para agregar campos:
        if (arquetipo[k]["tipo"] != "estructural" && arquetipo[k]["tipo"] != "info" && arquetipo[k]["text"]) {
          this.agregarCampo(arquetipo[k])
        } else if (arquetipo[k]["tipo"] == "estructural") {
          //volover recorrer con el for
          var es_nodo_info = false
          for (var nodo_siguiente in arquetipo[k]) {
            if (typeof arquetipo[k][nodo_siguiente] == "object" && arquetipo[k][nodo_siguiente] !== null && !Array.isArray(arquetipo[k][nodo_siguiente])) {
              if (arquetipo[k][nodo_siguiente]["tipo"] == "info") {
                es_nodo_info = true
              }
            }
          }
          if (!es_nodo_info) {
            this.agregarCampo(arquetipo[k])
          }

        }

        this.agregarAlHistorial(arquetipo[k]);
      }
    }

  }

  asignarBotonTitulo(arquetipo: any) {
    var nombre_arquetipo = arquetipo["text"]
    var elemento = {
      type: "titulo_arquetipo",
      label: nombre_arquetipo,
      inputType: "text",
      name: this.n.toString(),
    }
    this.form.agregarBoton(elemento)
    this.arquetipo_agregado_historial.push({ "tipo": 1 })
    this.n = this.n + 1
  }

  recibirArquetipoId(arquetipo_id: string) {
    if (!this.habilitar_creacion_nueva_sesion) {
      if (arquetipo_id) {
        this.conexBack.getArquetipoById(arquetipo_id).subscribe(arquetipo => {
          this.asignarBotonTitulo(arquetipo),
            this.agregarAlHistorial(arquetipo)
          //luego de las dos funciones anteriores, el tipo de nodo esta seteado
          this.arquetipos_medical_sesion.push(this.arquetipo_agregado_historial)
          this.arquetipo_agregado_historial = []
        })
        this.mostrar_diagrama_arquetipos = false
      }
    } else {
      this.mensaje_error2 = "To add an archetype you must create a session first"

      $("#error_crear_sesion").show();
      window.setTimeout(function () {
        $("#error_crear_sesion").hide();
      }, 4000);
    }

  }

  submit(datos_form: any) {

    if (this.arquetipos_medical_sesion.length > 0) {
      var i = 0
      for (let arquetipo_in_historial of this.arquetipos_medical_sesion) {
        for (let j=0; j < arquetipo_in_historial.length; j++/*let nodo of arquetipo_in_historial*/) {
          var nombre_campo = datos_form["nombre_campos"][i]
          var valor_campo = datos_form["valor_campos"][i.toString()]
          if (typeof valor_campo == "object") {
            var fecha = valor_campo["_i"]["date"] + "/" + valor_campo["_i"]["month"] + "/" + valor_campo["_i"]["year"]
            valor_campo = fecha
          }

          //nodo[nombre_campo] = valor_campo
          // nodo = arquetipo_in_historial[j]
          arquetipo_in_historial[j]["clave"] = nombre_campo
          arquetipo_in_historial[j]["valor"] = valor_campo
          //se verifican campos no utilizados
          if(arquetipo_in_historial[j]["tipo"] == 4 && (arquetipo_in_historial[j]["valor"] == arquetipo_in_historial[j]["clave"] || arquetipo_in_historial[j]["valor"] == "")){
            arquetipo_in_historial.splice(j, 1)
            j--; 
          }
          i = i + 1
        }
      }
      this.current_medical_sesion["arquetipos"] = this.arquetipos_medical_sesion
      this.patient_journey["sesiones_medica"].push(this.current_medical_sesion)
      //agrego el profesional que atendio solo si nunca habia atendido al paciente
      var atendio_al_paciente_antes = false
      for (let profesional of this.patient_journey["profesionales_que_atendieron"]) {
        if (this.user.user.id == profesional["user_id"]) {
          atendio_al_paciente_antes = true
          profesional["fecha"] = this.current_medical_sesion["fecha"]
        }
      }
      if (!atendio_al_paciente_antes) {
        this.patient_journey["profesionales_que_atendieron"].push({"user_id": this.user.user.id, "fecha": this.current_medical_sesion["fecha"]})
      }
      this.resetDatosCurrentSesionMedica()

      this.patientService.putPatient(this.patient_journey["rut"], this.patient_journey).subscribe(
        data => {
          //console.log(data)
        },
        error => {
          console.log('error', error)
        }
      );
      
    } else {
      this.mensaje_error2 = "You must add at least one archetype to the session"
      $("#error_agregar_arquetipo").show();
      window.setTimeout(function () {
        $("#error_agregar_arquetipo").hide();
      }, 4000);
    }


  }
  resetDatosCurrentSesionMedica() {
    this.current_medical_sesion = {}
    this.arquetipos_medical_sesion = []
    this.arquetipo_agregado_historial = []//se irá insertando al array arquetipos_medical_sesion
    this.n = 0
    this.regConfig = [{
      type: "button",
      label: "Save"
    }]
    this.form.resetDatosCurrentSesionMedica()
    this.habilitar_creacion_nueva_sesion = true

  }

  cambiarComponente(mensaje: boolean) {
    this.mostrar_diagrama_arquetipos = mensaje
    window.scroll(0, 50);
  }
  closeDiagram() {
    this.mostrar_diagrama_arquetipos = false
  }

  downloadPDF() {
    this.pdfService.fichaPacienteToPdf(this.patient_journey)
  }

  menuToggle(open: boolean) {
    this.menu_abierto = open
    $("#wrapper").toggleClass("toggled");
  }
}
