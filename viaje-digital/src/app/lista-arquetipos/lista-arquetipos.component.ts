import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConexionBackendService } from '../servicios/conexion-backend.service'
import { SeleccionarArquetipoService } from '../servicios/seleccionar-arquetipo.service'
import { FILTROS } from '../filtro-arquetipos'
import { TranslateService } from '.../../node_modules/@ngx-translate/core'
import { UserService } from '../servicios/user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  @Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();
  @Output() emitir_id_arquetipo = new EventEmitter<string>();

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo: SeleccionarArquetipoService, public translate: TranslateService, private userService: UserService, private formBuilder: FormBuilder) { }
  
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
  current_user_id:number

  ListsForm: FormGroup
  user_listas_arquetipos = []
  arquetipo_de_mylist = {}

  createNewListForm: FormGroup
  habilitar_new_list_form: boolean = false

  editListForm: FormGroup
  nombre_lista_a_cambiar: string

  get userListsFormArray() {
    return this.ListsForm.controls.lists as FormArray;
  }

  ngOnInit(): void {
    this.nombres_filtros = Object.keys(this.filtros)
    this.nombres_filtros.unshift("All")

    this.conexBack.getArquetipos().subscribe(resp => this.arquetiposFromDB(resp));
    this.en_historial_clinico = this.elegirArquetipo.getArquetipos_en_historial()

    this.ListsForm = this.formBuilder.group({
      lists: new FormArray([], minSelectedCheckboxes(1))
    })
    this.createNewListForm = this.formBuilder.group({
      list_name: ['', Validators.required]
    })
    this.editListForm = this.formBuilder.group({
      list_name: ['', Validators.required]
    })
    
    this.current_user_id = parseInt(this.userService.getIdUser())
    this.userService.getUserArchetypeLists(this.current_user_id).subscribe(
      data => {
        this.user_listas_arquetipos = data["listas_arquetipos"]
        this.addCheckboxes()
        console.log(this.user_listas_arquetipos)
      },
      error => {
        console.log(error)
      }
    );

  }

  private addCheckboxes() {
    this.user_listas_arquetipos.forEach(() => this.userListsFormArray.push(new FormControl(false)));
  }

  agregarArquetipoToLista(){
    const selected_lists = this.ListsForm.value.lists
      .map((checked, i) => checked ? this.user_listas_arquetipos[i].nombre_lista : null)
      .filter(v => v !== null);
    
    for(let selected_list of selected_lists){
      for(let i=0; i<this.user_listas_arquetipos.length; i++){
        if(selected_list == this.user_listas_arquetipos[i]['nombre_lista']){
          this.user_listas_arquetipos[i].arquetipos.push(this.arquetipo_de_mylist)
        }
      }
    }
    this.actualizarMisListasEnDB()
    $('#modalListasPersonalizadas').modal('toggle');
  }

  seleccionarDesdeMiLista(arquetipo: any){
    this.arquetipo_de_mylist = arquetipo
    $('#modalListasPersonalizadas').modal('show');
  }
  quitarDeMilista(nombre_lista:string, arquetipo: any){

    let arquetipo_id = arquetipo["_id"] ?? arquetipo["id"]  

    for(let i=0; i<this.user_listas_arquetipos.length; i++){
      if(nombre_lista == this.user_listas_arquetipos[i]['nombre_lista']){
        for(let j=0; j<this.user_listas_arquetipos[i]['arquetipos'].length; j++){
          let arquetipo_buscado_id = this.user_listas_arquetipos[i]['arquetipos'][j]['_id'] ?? this.user_listas_arquetipos[i]['arquetipos'][j]['id']
          if(arquetipo_id == arquetipo_buscado_id){
            this.user_listas_arquetipos[i]['arquetipos'].splice(j, 1)
            this.actualizarMisListasEnDB()
            return
          }
          
        }
      }
    }

  }
  habilitarNewListForm(){
    this.habilitar_new_list_form = true
  }
  crearNuevaLista(){
    //console.log(this.createNewListForm.value)
    
    let lista = { nombre_lista:this.createNewListForm.value.list_name, arquetipos:[] }
    this.user_listas_arquetipos.push(lista)

    this.ListsForm = this.formBuilder.group({
      lists: new FormArray([], minSelectedCheckboxes(1))
    })
    this.addCheckboxes()

    this.habilitar_new_list_form = false
  }
  seleccionarListaToEditar(lista:string){
    this.nombre_lista_a_cambiar = lista
    this.editListForm.controls["list_name"].setValue(lista)
    $('#modalEditListName').modal('show');
  }
  editarNombreLista(){
    let nombre_lista_actualizado = this.editListForm.value.list_name
 
    for(let i=0; i<this.user_listas_arquetipos.length; i++){
      if(this.nombre_lista_a_cambiar == this.user_listas_arquetipos[i]['nombre_lista']){
        this.user_listas_arquetipos[i]['nombre_lista'] = nombre_lista_actualizado
        $('#modalEditListName').modal('toggle');
        this.actualizarMisListasEnDB()
        return
      }
    }
    
  }
  eliminarLista(lista:string){
    var acpetar = confirm("Are you sure you want to delete this custom list?");
    if(acpetar){
      for(let i=0; i<this.user_listas_arquetipos.length; i++){
        if(lista == this.user_listas_arquetipos[i]['nombre_lista']){
          this.user_listas_arquetipos.splice(i, 1)
          this.ListsForm = this.formBuilder.group({
            lists: new FormArray([], minSelectedCheckboxes(1))
          })
          this.addCheckboxes()
          this.actualizarMisListasEnDB()
          return
        }
      }
    }
    
  }

  actualizarMisListasEnDB(){
    let listas_arquetipos_actualizada = {"listas_arquetipos":this.user_listas_arquetipos}
    this.userService.putUserArchetypeLists(listas_arquetipos_actualizada, this.current_user_id).subscribe(
      data => {
        if(!data['actualizada'])
          console.log("Error, the list was not updated")
        },
        error => {
          console.log(error)
        }
    )
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
    //console.log(arquetipos)
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
    let arquetipo_id
    if(arquetipo["id"]){
      arquetipo_id = arquetipo["id"]
    }
    else{
      arquetipo_id = arquetipo["_id"]
    }
    //MEJORAR LOGICA DE COMO SE TRANSFIERE ESTA INFORMACIÓN ENTRE COMPONENTES
    this.conexBack.getArquetipoById(arquetipo_id).subscribe(arquetipo => {
      this.emitir_id_arquetipo.emit(arquetipo["_id"])
      this.elegirArquetipo.agregarAlHistorial(arquetipo)
    })
  }
  verArquetipo(arquetipo: any) {
    //alert("Comienza la fiesta") mostrar_diagrama:boolean = false
    if(arquetipo["id"]){
      this.elegirArquetipo.asignar(arquetipo["id"])
    }
    else{
      this.elegirArquetipo.asignar(arquetipo["_id"])
    }
    
    this.elegirArquetipo.setTipo_arquetipo(arquetipo["tipo_arquetipo"])
    this.mostrar_diagrama_arquetipos.emit(true)
  }


}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
