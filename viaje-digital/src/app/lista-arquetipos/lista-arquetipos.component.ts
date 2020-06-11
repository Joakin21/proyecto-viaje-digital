import { Component, OnInit,AfterViewInit, Output, EventEmitter } from '@angular/core';
import {ConexionBackendService} from '../servicios/conexion-backend.service'
import {SeleccionarArquetipoService} from '../servicios/seleccionar-arquetipo.service'
import {FILTROS} from '../filtro-arquetipos'

declare var $:any;

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit,AfterViewInit  {

  @Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo:SeleccionarArquetipoService) { }
  //ngAfterViewInit(){}
  //para repositorio openehr
  cluster:any[] = []
  composition:any[] = []
  action:any[] = []
  admin_entry:any[] = []
  evaluation:any[] = []
  instruction:any[] = []
  observation:any[] = []
  section:any[] = []

  arquetipos:any = {}
  //para mis arquetipos
  en_historial_clinico:any[] = []

  filtros = FILTROS
  nombres_filtros:string[] = []
  ngOnInit(): void {
    this.nombres_filtros = Object.keys(this.filtros)
    this.nombres_filtros.unshift("All")
    //console.log(this.nombres_filtros)

    this.conexBack.getArquetipos().subscribe(resp => this.arquetiposFromDB(resp));
    //que tipo de arquetipos mostrar?: los que el usuario anteriormente estaba viendo
    /*
    var tipo_arquetipo = this.elegirArquetipo.getTipo_arquetipo()
    console.log("tipo arquetipo: ",tipo_arquetipo)
    console.log("CLUSTER!!!")
    console.log(this.cluster)
    if(tipo_arquetipo == "CLUSTER"){
      $('#list-tab a[href="#cluster"]').tab('show') 
    }else if(tipo_arquetipo == "COMPOSITION"){
      $('#list-tab a[href="#composition"]').tab('show') 
    }else if(tipo_arquetipo == "ACTION"){
      console.log("La wea pasa por aqui !!! :(")
      $('#list-tab a[href="#action"]').tab('show') 
    }else if(tipo_arquetipo == "ADMIN_ENTRY"){
      $('#list-tab a[href="#admin_entry"]').tab('show') 
    }else if(tipo_arquetipo == "EVALUATION"){
      $('#list-tab a[href="#evaluation"]').tab('show') 
    }else if(tipo_arquetipo == "INSTRUCTION"){
      $('#list-tab a[href="#instruction"]').tab('show') 
    }else if(tipo_arquetipo == "OBSERVATION"){
      $('#list-tab a[href="#observation"]').tab('show') 
    }else if(tipo_arquetipo == "SECTION"){
      $('#list-tab a[href="#section"]').tab('show') 
    }*/

    //Arquetipos que actualmente estan en el diagrama
    this.en_historial_clinico = this.elegirArquetipo.getArquetipos_en_historial()
    //console.log(this.en_historial_clinico)
    console.log("Filtro:",this.elegirArquetipo.getNombre_filtro())
    
  }
  ngAfterViewInit(){
    /*let element = document.getElementById("filter_name") as HTMLInputElement
    element.value = "Hearing";*/
    /*var filter_selected = this.elegirArquetipo.getNombre_filtro()
    let element = document.getElementById("filter_name") as HTMLSelectElement
    element.value = filter_selected;
    this.seleccionarFiltro(filter_selected)*/
  }
  

  /*testTipoArquetipo(){
    alert("Hello!")
    $('#list-tab a[href="#action"]').tab('show') 
    let element = document.getElementById("filter_name") as HTMLSelectElement
    element.value = "Hearing";
    this.seleccionarFiltro("Hearing")
    //document.getElementById('inputGroupSelect01').value = "value";
  }*/

  arquetiposFromDB(arquetipos:any[]){
    this.limpiarArraysFromDB()
    for (let arq of arquetipos) {
      if(arq["tipo_arquetipo"] == "CLUSTER"){
        this.cluster.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "COMPOSITION"){
        this.composition.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "ACTION"){
        this.action.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "ADMIN_ENTRY"){
        this.admin_entry.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "EVALUATION"){
        this.evaluation.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "INSTRUCTION"){
        this.instruction.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "OBSERVATION"){
        this.observation.push(arq)
      }
      else if(arq["tipo_arquetipo"] == "SECTION"){
        this.section.push(arq)
      }
      
    }
    /*
    this.cluster = []
    this.composition = []
    this.action = []
    this.admin_entry= []
    this.evaluation = []
    this.instruction = []
    this.observation = []
    this.section= []
    */
     
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

  seleccionarArquetipo(arquetipo:any){
    //console.log(arquetipo)
    this.elegirArquetipo.asignar(arquetipo["id"])
    this.elegirArquetipo.setTipo_arquetipo(arquetipo["tipo_arquetipo"])
    this.mostrar_diagrama_arquetipos.emit(true)

  }
  limpiarArraysFromDB(){
    this.cluster = []
    this.composition = []
    this.action = []
    this.admin_entry= []
    this.evaluation = []
    this.instruction = []
    this.observation = []
    this.section= []
  
  }
  reestablecerArquetipos(){
    this.cluster = this.arquetipos["cluster"]
    this.composition = this.arquetipos["composition"]
    this.action = this.arquetipos["action"]
    this.admin_entry = this.arquetipos["admin_entry"]
    this.evaluation = this.arquetipos["evaluation"]
    this.instruction = this.arquetipos["instruction"]
    this.observation = this.arquetipos["observation"]
    this.section = this.arquetipos["section"]
  }
  seleccionarFiltro(nombre_filtro){
    this.reestablecerArquetipos()
    //$('#list-tab a[href="#action"]').tab('show') 
    this.elegirArquetipo.setNombre_filtro(nombre_filtro)
    if(nombre_filtro!="All"){
      if(this.filtros[nombre_filtro]["cluster"]){
        this.cluster = this.adaptarFitro(this.filtros[nombre_filtro]["cluster"], this.cluster)
      }
      else{
        this.cluster = []
      }
      if(this.filtros[nombre_filtro]["composition"]){
        this.composition = this.adaptarFitro(this.filtros[nombre_filtro]["composition"], this.composition)
      }
      else{
        this.composition = []
      }
      if(this.filtros[nombre_filtro]["action"]){
        this.action = this.adaptarFitro(this.filtros[nombre_filtro]["action"], this.action)
      }
      else{
        this.action = []
      }
      if(this.filtros[nombre_filtro]["admin_entry"]){
        this.admin_entry = this.adaptarFitro(this.filtros[nombre_filtro]["admin_entry"], this.admin_entry)
      }
      else{
        this.admin_entry = []
      }
      if(this.filtros[nombre_filtro]["evaluation"]){
        this.evaluation = this.adaptarFitro(this.filtros[nombre_filtro]["evaluation"], this.evaluation)
      }
      else{
        this.evaluation = []
      }
      if(this.filtros[nombre_filtro]["instruction"]){
        this.instruction = this.adaptarFitro(this.filtros[nombre_filtro]["instruction"], this.instruction)
      }
      else{
        this.instruction = []
      }
      if(this.filtros[nombre_filtro]["observation"]){
        this.observation = this.adaptarFitro(this.filtros[nombre_filtro]["observation"], this.observation)
      }
      else{
        this.observation = []
      }
      if(this.filtros[nombre_filtro]["section"]){
        this.section = this.adaptarFitro(this.filtros[nombre_filtro]["section"], this.section)
      }
      else{
        this.section = []
      }
      
    }
    /*if(nombre_filtro=="All"){
      
      $('#list-tab a[href="#action"]').tab('show') 
    }*/
    //alert(nombre_filtro)
  }

  adaptarFitro(array_from_filtro:string[], array_from_db:any[]){
    var aux_array = []
    for(var nombre_arq_from_filtro of array_from_filtro){
      var i = 0
      var continuar = true
      while(continuar && i < array_from_db.length){
        if(array_from_db[i]["nombre"] == nombre_arq_from_filtro){
          aux_array.push(array_from_db[i])
          continuar = false
        }
        i ++
      }
    }
    return aux_array
  }
}
