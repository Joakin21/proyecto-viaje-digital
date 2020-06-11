import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionarArquetipoService {
  
  private messageSource = new BehaviorSubject(null);
  currentArquetipo = this.messageSource.asObservable();

  private tipo_arquetipo = "CLUSTER"
  private nombre_filtro = "All"

  private arquetipos_en_historial:any[] = []

  constructor() { }
  //arquetipo: any

  asignar(message: any) {
    this.messageSource.next(message)
  }

  //funcionnes para lista-arquetipos.component para almacenar y obtener la lista seleccionada por el usuario
  getTipo_arquetipo():string{
    return this.tipo_arquetipo
  }
  setTipo_arquetipo(tipo_arquetipo:string):void{
    this.tipo_arquetipo = tipo_arquetipo
  }
  //funciones para lista-arquetipos.component para almacenar y obtener nombre del filtro seleccionado
  getNombre_filtro():string{
    return this.nombre_filtro
  }
  setNombre_filtro(nombre_filtro:string):void{
    this.nombre_filtro = nombre_filtro
  }

  //Funciones para mantener en un array los arquetipos que se agregaron a la ficha
  agregarAlHistorial(arquetipo:any):void{
    var arquetipo_acotado = {"id":arquetipo["_id"], "nombre":arquetipo["text"], "tipo_arquetipo":arquetipo["tipo_arquetipo"]}
    this.arquetipos_en_historial.push(arquetipo_acotado)
  }
  getArquetipos_en_historial():any{
    return this.arquetipos_en_historial
  }
}
