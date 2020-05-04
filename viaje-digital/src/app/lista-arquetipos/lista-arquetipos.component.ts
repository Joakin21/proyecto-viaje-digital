import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ConexionBackendService} from '../servicios/conexion-backend.service'
import {SeleccionarArquetipoService} from '../servicios/seleccionar-arquetipo.service'

declare var $:any;

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  @Output() mostrar_diagrama_arquetipos = new EventEmitter<boolean>();

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo:SeleccionarArquetipoService) { }

  ngOnInit(): void {

    this.conexBack.getArquetipos().subscribe(resp => this.arquetiposFromDB(resp));
    //que tipo de arquetipos mostrar?: los que el usuario anteriormente estaba viendo
    var tipo_arquetipo = this.elegirArquetipo.getTipo_arquetipo()
    /*
    tipos = "CLUSTER", "COMPOSITION", "ACTION", "ADMIN_ENTRY", "EVALUATION", "INSTRUCTION", "OBSERVATION", "SECTION"
    */
    if(tipo_arquetipo == "CLUSTER"){
      $('#list-tab a[href="#cluster"]').tab('show') 
    }else if(tipo_arquetipo == "COMPOSITION"){
      $('#list-tab a[href="#composition"]').tab('show') 
    }else if(tipo_arquetipo == "ACTION"){
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
    }

    //Arquetipos que actualmente estan en el diagrama
    this.en_historial_clinico = this.elegirArquetipo.getArquetipos_en_historial()
    //console.log(this.en_historial_clinico)
  }
  //para repositorio openehr
  cluster:any[] = []
  composition:any[] = []
  action:any[] = []
  admin_entry:any[] = []
  evaluation:any[] = []
  instruction:any[] = []
  observation:any[] = []
  section:any[] = []

  //para mis arquetipos
  en_historial_clinico:any[] = []

  arquetiposFromDB(arquetipos:any[]){
    
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
  }

  seleccionarArquetipo(arquetipo:any){
    //console.log(arquetipo)
    this.elegirArquetipo.asignar(arquetipo["id"])
    this.elegirArquetipo.setTipo_arquetipo(arquetipo["tipo_arquetipo"])
    this.mostrar_diagrama_arquetipos.emit(true)

  }
}
