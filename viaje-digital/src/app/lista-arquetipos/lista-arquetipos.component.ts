import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConexionBackendService } from '../servicios/conexion-backend.service'
import { SeleccionarArquetipoService } from '../servicios/seleccionar-arquetipo.service'
import { FILTROS } from '../filtro-arquetipos'
import { TranslateService } from '.../../node_modules/@ngx-translate/core'

declare var $: any;

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  @Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();
  @Output() emitir_id_arquetipo = new EventEmitter<string>();

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo: SeleccionarArquetipoService, public translate: TranslateService) { }
  cluster: any[] = []
  composition: any[] = []
  action: any[] = []
  admin_entry: any[] = []
  evaluation: any[] = []
  instruction: any[] = []
  observation: any[] = []
  section: any[] = []

  arquetipos: any = {}
  //para mis arquetipos
  en_historial_clinico: any[] = []

  filtros = FILTROS
  nombres_filtros: string[] = []

  buscarArquetipo = ''
  placeholder_buscador = '';

  ngOnInit(): void {
    this.nombres_filtros = Object.keys(this.filtros)
    this.nombres_filtros.unshift("All")

    this.conexBack.getArquetipos().subscribe(resp => this.arquetiposFromDB(resp));
    this.en_historial_clinico = this.elegirArquetipo.getArquetipos_en_historial()
    //console.log(this.en_historial_clinico)
    console.log("Filtro:", this.elegirArquetipo.getNombre_filtro())

  }

  arquetiposFromDB(arquetipos: any[]) {
    this.limpiarArraysFromDB()
    for (let arq of arquetipos) {
      if (arq["tipo_arquetipo"] == "CLUSTER") {
        this.cluster.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "COMPOSITION") {
        this.composition.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "ACTION") {
        this.action.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "ADMIN_ENTRY") {
        this.admin_entry.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "EVALUATION") {
        this.evaluation.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "INSTRUCTION") {
        this.instruction.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "OBSERVATION") {
        this.observation.push(arq)
      }
      else if (arq["tipo_arquetipo"] == "SECTION") {
        this.section.push(arq)
      }

    }

    this.arquetipos["cluster"] = this.cluster
    this.arquetipos["composition"] = this.composition
    this.arquetipos["action"] = this.action
    this.arquetipos["admin_entry"] = this.admin_entry
    this.arquetipos["evaluation"] = this.evaluation
    this.arquetipos["instruction"] = this.instruction
    this.arquetipos["observation"] = this.observation
    this.arquetipos["section"] = this.section

    //codigo de prro para cambiar filtro
    var filter_selected = this.elegirArquetipo.getNombre_filtro()
    let element = document.getElementById("filter_name") as HTMLSelectElement
    element.value = filter_selected;
    this.seleccionarFiltro(filter_selected)



  }

  seleccionarArquetipo(arquetipo: any) {
    //console.log(arquetipo)
    this.elegirArquetipo.asignar(arquetipo["id"])
    this.elegirArquetipo.setTipo_arquetipo(arquetipo["tipo_arquetipo"])
    this.mostrar_diagrama_arquetipos.emit(true)

  }
  limpiarArraysFromDB() {
    this.cluster = []
    this.composition = []
    this.action = []
    this.admin_entry = []
    this.evaluation = []
    this.instruction = []
    this.observation = []
    this.section = []

  }
  reestablecerArquetipos() {
    this.cluster = this.arquetipos["cluster"]
    this.composition = this.arquetipos["composition"]
    this.action = this.arquetipos["action"]
    this.admin_entry = this.arquetipos["admin_entry"]
    this.evaluation = this.arquetipos["evaluation"]
    this.instruction = this.arquetipos["instruction"]
    this.observation = this.arquetipos["observation"]
    this.section = this.arquetipos["section"]
  }

  seleccionarFiltro(nombre_filtro) {
    this.reestablecerArquetipos()
    var idioma_buscar
    if (this.translate.currentLang == "en")
      idioma_buscar = "Search in"
    if (this.translate.currentLang == "es")
      idioma_buscar = "Buscar en"
    this.translate.get("nombre-filtros." + nombre_filtro).subscribe(res => {
      //console.log("traduccion:", res)
      var nombre_filtro_traducido = res
      this.placeholder_buscador = idioma_buscar + " " + nombre_filtro_traducido + " ..."
    })

    this.elegirArquetipo.setNombre_filtro(nombre_filtro)
    if (nombre_filtro != "All") {
      if (this.filtros[nombre_filtro]["cluster"]) {
        this.cluster = this.adaptarFitro(this.filtros[nombre_filtro]["cluster"], this.cluster)
      }
      else {
        this.cluster = []
      }
      if (this.filtros[nombre_filtro]["composition"]) {
        this.composition = this.adaptarFitro(this.filtros[nombre_filtro]["composition"], this.composition)
      }
      else {
        this.composition = []
      }
      if (this.filtros[nombre_filtro]["action"]) {
        this.action = this.adaptarFitro(this.filtros[nombre_filtro]["action"], this.action)
      }
      else {
        this.action = []
      }
      if (this.filtros[nombre_filtro]["admin_entry"]) {
        this.admin_entry = this.adaptarFitro(this.filtros[nombre_filtro]["admin_entry"], this.admin_entry)
      }
      else {
        this.admin_entry = []
      }
      if (this.filtros[nombre_filtro]["evaluation"]) {
        this.evaluation = this.adaptarFitro(this.filtros[nombre_filtro]["evaluation"], this.evaluation)
      }
      else {
        this.evaluation = []
      }
      if (this.filtros[nombre_filtro]["instruction"]) {
        this.instruction = this.adaptarFitro(this.filtros[nombre_filtro]["instruction"], this.instruction)
      }
      else {
        this.instruction = []
      }
      if (this.filtros[nombre_filtro]["observation"]) {
        this.observation = this.adaptarFitro(this.filtros[nombre_filtro]["observation"], this.observation)
      }
      else {
        this.observation = []
      }
      if (this.filtros[nombre_filtro]["section"]) {
        this.section = this.adaptarFitro(this.filtros[nombre_filtro]["section"], this.section)
      }
      else {
        this.section = []
      }

    }

  }

  adaptarFitro(array_from_filtro: string[], array_from_db: any[]) {
    var aux_array = []
    for (var nombre_arq_from_filtro of array_from_filtro) {
      var i = 0
      var continuar = true
      while (continuar && i < array_from_db.length) {
        if (array_from_db[i]["nombre"] == nombre_arq_from_filtro) {
          aux_array.push(array_from_db[i])
          continuar = false
        }
        i++
      }
    }
    return aux_array
  }

  agregarAlHistorial(arquetipo: any) {

    //MEJORAR LOGICA DE COMO SE TRANSFIERE ESTA INFORMACIÓN ENTRE COMPONENTES
    this.conexBack.getArquetipoById(arquetipo["id"]).subscribe(arquetipo => {
      console.log(arquetipo)
      this.emitir_id_arquetipo.emit(arquetipo["_id"])
      this.elegirArquetipo.agregarAlHistorial(arquetipo)
    })
  }
  verArquetipo(arquetipo: any) {
    //alert("Comienza la fiesta") mostrar_diagrama:boolean = false
    this.elegirArquetipo.asignar(arquetipo["id"])
    this.elegirArquetipo.setTipo_arquetipo(arquetipo["tipo_arquetipo"])
    this.mostrar_diagrama_arquetipos.emit(true)
  }

}
