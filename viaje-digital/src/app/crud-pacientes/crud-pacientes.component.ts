import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../servicios/paciente.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '.../../node_modules/@ngx-translate/core'

declare var $: any;

@Component({
  selector: 'app-crud-pacientes',
  templateUrl: './crud-pacientes.component.html',
  styleUrls: ['./crud-pacientes.component.css']
})
export class CrudPacientesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor(private patientService: PacienteService, private formBuilder: FormBuilder, public translate: TranslateService) { }

  createPatientForm: FormGroup
  updatePatientForm: FormGroup


  my_patients: any[] = []

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(
      data => {
        this.my_patients = data
        console.log(this.my_patients)
      },
      error => {
        console.log('error', error)
      }
    );
    
    let my_url = 'http://cdn.datatables.net/plug-ins/1.10.21/i18n/English.json'
    if(this.translate.currentLang == "es"){
      my_url = '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
    }
    //console.log(this.translate.currentLang)
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url:my_url
      }
    };

    this.createPatientForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      ciudad: ['', Validators.required]
    })

    this.updatePatientForm = this.formBuilder.group({
      update_nombre: ['', Validators.required],
      update_apellidos: ['', Validators.required],
      update_rut: ['', Validators.required],
      update_direccion: ['', Validators.required],
      update_fecha_nacimiento: ['', Validators.required],
      update_ciudad: ['', Validators.required]
    })

  }

  error_create_patient: string = ""
  show_error_create_patient: boolean = false
  createPatient() {
    var new_patient = this.createPatientForm.value
    new_patient["es_atendido_ahora"] = false 
    new_patient["profesionales_que_atendieron"] = []
    new_patient["sesiones_medica"] = []

    //Preparamos los datos
    this.patientService.postPatient(new_patient).subscribe(
      new_patient_resp => {
        if (new_patient_resp["detail"]) {
          this.error_create_patient = new_patient_resp["detail"]
          this.show_error_create_patient = true
        }
        else {
          this.show_error_create_patient = false
          //adapto respuesta (id de paciente creado)
          new_patient["_id"] = new_patient_resp["_id"]
          delete new_patient["es_atendido_ahora"]
          delete new_patient["profesionales_que_atendieron"]
          delete new_patient["sesiones_medica"]
          this.my_patients.push(new_patient)
          $('#modalCreatePatient').modal('toggle');
        }

      },
      error => {
        console.log('error', error)
      }
    );


  }

  deletePatient(patient_index) {
    var respuesta = confirm("Are you sure you want to delete this patient?");
    if (respuesta) {
      var patient_rut = this.my_patients[patient_index]["rut"]
      this.patientService.deletePatient(patient_rut).subscribe(
        data => {
          if (!data["detail"]) {//sin no hay un error inesperado
            console.log(data)
            this.my_patients.splice(patient_index, 1)
          }
        },
        error => {
          console.log('error', error)
        }
      );
    }

  }
  index_patient_to_update: number
  prepareModalUpdatePatient(patient_index) {
    this.index_patient_to_update = patient_index

    this.updatePatientForm.controls["update_nombre"].setValue(this.my_patients[patient_index]["nombre"])
    this.updatePatientForm.controls["update_apellidos"].setValue(this.my_patients[patient_index]["apellidos"])
    this.updatePatientForm.controls["update_rut"].setValue(this.my_patients[patient_index]["rut"])
    this.updatePatientForm.controls["update_direccion"].setValue(this.my_patients[patient_index]["direccion"])
    this.updatePatientForm.controls["update_fecha_nacimiento"].setValue(this.my_patients[patient_index]["fecha_nacimiento"])
    this.updatePatientForm.controls["update_ciudad"].setValue(this.my_patients[patient_index]["ciudad"])

    $('#modalUpdatePatient').modal('show');
  }

  error_update_patient: string = ""
  show_error_update_patient: boolean = false
  updatePatient() {
    //Los campos vienen listos (se validan que no esten vacios)
    var updatePatientForm = this.updatePatientForm.value
    var rut_patient_to_update = this.my_patients[this.index_patient_to_update]["rut"]
    //obtener paciente completo:
    this.patientService.getPatient(rut_patient_to_update).subscribe(
      data => {
        //Modificamos los datos base
        var patient_to_uodate = data
        patient_to_uodate["nombre"] = updatePatientForm["update_nombre"]
        patient_to_uodate["apellidos"] = updatePatientForm["update_apellidos"]
        patient_to_uodate["rut"] = updatePatientForm["update_rut"]
        patient_to_uodate["direccion"] = updatePatientForm["update_direccion"]
        patient_to_uodate["fecha_nacimiento"] = updatePatientForm["update_fecha_nacimiento"]
        patient_to_uodate["ciudad"] = updatePatientForm["update_ciudad"]

        this.patientService.putPatient(rut_patient_to_update, patient_to_uodate).subscribe(
          data => {

            if (!data["detail"]) {
              delete patient_to_uodate["profesionales_que_atendieron"]
              delete patient_to_uodate["sesiones_medica"]
              this.my_patients[this.index_patient_to_update] = patient_to_uodate
              this.show_error_update_patient = false
              $('#modalUpdatePatient').modal('toggle');
              console.log(this.my_patients)
            } else {
              this.error_update_patient = data["detail"]
              this.show_error_update_patient = true
            }

          },
          error => {
            console.log('error', error)
          }
        );

      },
      error => {
        console.log('error', error)
      }
    );


  }



  public trackItem(index: number) {

    return index;
  }

}
