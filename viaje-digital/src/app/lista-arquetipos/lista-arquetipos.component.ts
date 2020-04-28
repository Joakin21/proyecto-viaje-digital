import { Component, OnInit } from '@angular/core';
import {ConexionBackendService} from '../servicios/conexion-backend.service'
import {SeleccionarArquetipoService} from '../servicios/seleccionar-arquetipo.service'

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo:SeleccionarArquetipoService) { }

  ngOnInit(): void {

    this.conexBack.getArquetipos().subscribe(resp => this.arquetiposFromDB(resp));
  }

  cluster:any[] = []
  composition:any[] = []
  action:any[] = []
  admin_entry:any[] = []
  evaluation:any[] = []
  instruction:any[] = []
  observation:any[] = []
  section:any[] = []

  ir_al_diagrama:boolean = false

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
  }
}
