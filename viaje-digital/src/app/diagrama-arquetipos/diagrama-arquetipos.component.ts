import { Component, OnInit, Output, EventEmitter,AfterViewInit } from '@angular/core';
import {SeleccionarArquetipoService} from '../servicios/seleccionar-arquetipo.service'
import {ConexionBackendService} from '../servicios/conexion-backend.service'

declare var $:any;
declare var jsMind:any

@Component({
  selector: 'app-diagrama-arquetipos',
  templateUrl: './diagrama-arquetipos.component.html',
  styleUrls: ['./diagrama-arquetipos.component.css']
})
export class DiagramaArquetiposComponent implements OnInit,AfterViewInit {

  @Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();
  @Output() emitir_id_arquetipo = new EventEmitter<string>();

  constructor(private elegirArquetipo: SeleccionarArquetipoService, private conexBack: ConexionBackendService) { }

  arquetipo_id:string
  nombre_arquetipo:string
  myData: any[] = []

  id_nodo = 2
  _jm:any
  arquetipo:any

  tipo:string = ""
  text:string = ""
  description:string = ""
  comment:string = ""
  source:string = ""
  contenido:any[] = []

  id_nodo_editar:string
  selected_node:any
  
  crearData(obj){ 
    for (var k in obj)
    {
        
        if (typeof obj[k] == "object" && obj[k] !== null && !Array.isArray(obj[k])){

              var direction = "left"
              if(obj[k]["text"] == "description" || obj[k]["text"] == "attribution"){
                direction = "right"
              }else{
                direction = "left"
              }
              var color 
              if(obj[k]["tipo"] == "estructural")
                color = "#A4A4A4"//gis normal
              else
                color = "#D8D8D8"//gis claro
              obj[k]["id_nodo"] = "nodo"+this.id_nodo
              this.myData.push({"id":obj[k]["id_nodo"], "parentid":obj["id_nodo"],"direction":direction, "topic":obj[k]["text"], "background-color":color, "foreground-color":"black"})
              this.id_nodo = this.id_nodo + 1
            this.crearData(obj[k]);
        }

    }

  }

  limpiarAtributosNodos(){
    this.tipo = ""
    this.text = ""
    this.description = ""
    this.comment = ""
    this.source = ""
  }
  LLenarModalDatosBase(nodo:any){
    if (nodo["tipo"])
      this.tipo = nodo["tipo"] 
    else 
      this.tipo = ""
    if (nodo["text"])
      this.text = nodo["text"]
    else 
      this.text = ""
    if (nodo["description"])
      this.description = nodo["description"]
    else
      this.description = ""
    if (nodo["comment"])
      this.comment = nodo["comment"]
    else 
      this.comment = ""
    if (nodo["source"])
      this.source = nodo["source"]
    else
      this.source = ""

    this._jm.select_clear()

  }
  mensajeContenido:string = ""
  mensajeEdicion:string = ""
  tipo_nodo_elegido:string
  mostrar_contenido:boolean

  info_text:string = ""
  info_value:any
  info_is_lista:boolean = false

  configurarJsMind(){
    var mind = {
      "meta":{
          "name":"demo",
          "author":"hizzgdev@163.com",
          "version":"0.2",
      },
      "format":"node_array",
      "data":this.myData

    };
    var options = {
        container:'jsmind_container',
        editable:true,
        theme:'primary'
    }
    this._jm = jsMind.show(options,mind);

  }

  dibujarArquetipoImportado(arquetipo){
    //reset view area
    document.getElementById("jsmind_container").innerHTML = ""
    this.myData = []
    
    arquetipo["id_nodo"] ="nodo1"
    this.myData.push({"id":arquetipo["id_nodo"], "isroot":true, "topic":arquetipo["text"]})
    this.crearData(arquetipo)
    console.log(arquetipo)
    this.arquetipo = arquetipo
    this.configurarJsMind()
    
  }

  
  ngOnInit() {
    //Obtengo id del arquetipo importado
    this.elegirArquetipo.currentArquetipo.subscribe(id_arq => {
      this.arquetipo_id = id_arq
      
      if(this.arquetipo_id==null){
        //volver a inicio
        //this.router.navigateByUrl('/visualizador')
        console.log("test!")
      }
      else if(this.arquetipo_id=="nuevo arquetipo"){
        console.log(this.arquetipo_id)
        
      }
      else{
        this.conexBack.getArquetipoById(this.arquetipo_id).subscribe(arquetipo =>{
          this.dibujarArquetipoImportado(arquetipo),
          this.nombre_arquetipo = arquetipo["text"]
          //this.conexionesDiagramaImportado(jsPlumb,this.jsPlumbInstance,arquetipo,this.contador_nodos)
        })
      }
    })
    
  }//SeleccionarArquetipoService
  

  ngAfterViewInit(){
    //console.log("id: ",this.arquetipo_id)
    //this.jsPlumbInstance = jsPlumb.getInstance();
    /*if(this.arquetipo_id==null){
      //volver a inicio
      //this.router.navigateByUrl('/visualizador')
      console.log("test!")
    }
    else if(this.arquetipo_id=="nuevo arquetipo"){
      console.log(this.arquetipo_id)
      
    }
    else{
      this.conexBack.getArquetipoById(this.arquetipo_id).subscribe(arquetipo =>{
        this.dibujarArquetipoImportado(arquetipo),
        this.nombre_arquetipo = arquetipo["text"]
        //this.conexionesDiagramaImportado(jsPlumb,this.jsPlumbInstance,arquetipo,this.contador_nodos)
      })
    }*/

    /*this.elegirArquetipo.currentArquetipo.subscribe(data => {
      alert("Holaaaaaaa jiji horo :)")
    })*/

  }
  insertarDatosNodoModal(arquetipo,id_nodo){//luego intentar mejorar num iteraciones 
    for (var k in arquetipo){
      if (typeof arquetipo[k] == "object" && arquetipo[k] !== null && !Array.isArray(arquetipo[k])){
        if (id_nodo == arquetipo[k]["id_nodo"]){ //si encuentra el nodo y no es de tipo estructural ya que esos no contienen datos
              //console.log("id: ",id_nodo)
              if (arquetipo[k]["tipo"] != "estructural"){
                if(arquetipo[k]["tipo"] != "info"){
                  this.limpiarAtributosNodos()
                  //this.contenido = []
                  this.id_nodo_editar = id_nodo
                  this.tipo_nodo_elegido = arquetipo[k]["tipo"]
                  this.mostrar_contenido = true
                  
                  this.LLenarModalDatosBase(arquetipo[k])
                  this.contenido = arquetipo[k]["contenido"]
                  //Mensaje por defecto para el contenido de la mayoria de los nodos
                  this.mensajeContenido = "Contenido"
                  this.mensajeEdicion = "Editar contenido"

                  $('#modalTipo1').modal('show');

                  if(arquetipo[k]["tipo"] == "CHOICE"){
                    this.mensajeContenido = "Choice of"
                    this.mensajeEdicion = "Editar opciones disponibles"
                  }
                  else if(arquetipo[k]["tipo"] == "DV_CODED_TEXT"){

                  }
                  else if(arquetipo[k]["tipo"] == "DV_ORDINAL"){

                  }
                  /*else if(arquetipo[k]["tipo"] == "careflow_step"){
                    $('#modalTipo1').modal('toggle');
                    alert("no para careflow_step")
                  }*/
                  
                  else{
                    this.mostrar_contenido = false

                  }
                }
                else{
                  this.info_text = arquetipo[k]["text"]
                  this.info_value = arquetipo[k]["value"]
                  this.info_is_lista = Array.isArray(arquetipo[k]["value"]) 
                  this._jm.select_clear()
                  $('#modalTipoInfo').modal('show');

                }
              }
              else {//Si es un estructural
                this.limpiarAtributosNodos()
                this.id_nodo_editar = id_nodo
                this.LLenarModalDatosBase(arquetipo[k])

                //alert("intento abrir un estructural")
                $('#modalTipoEstructural').modal('show');
                
              }
        }
        this.insertarDatosNodoModal(arquetipo[k],id_nodo);
      }
    }

  }
  mostrarNodo(){
    var selected_node = this._jm.get_selected_node();
    if(!!selected_node){//Si selecciono un nodo
      var id_nodo = selected_node.id
      //realizar busqueda
      //si el nodo es base 
      if (id_nodo == "nodo1"){
        //alert("ya csm..")
        this.limpiarAtributosNodos()
        this.id_nodo_editar = id_nodo
        this.text = this.nombre_arquetipo
        this._jm.select_clear()
        alert("Nodo base no contiene info xd")
        //$('#modalTipoEstructural').modal('show');
      }
      else{
        this.insertarDatosNodoModal(this.arquetipo,id_nodo)
      }
      
    }else{
      alert('Debe seleccionar un nodo primero');
    }
  }

  agregarAlHistorial(){
    this.emitir_id_arquetipo.emit(this.arquetipo_id)
    this.elegirArquetipo.agregarAlHistorial(this.arquetipo)
  }
}
