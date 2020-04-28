import { Component, OnInit } from '@angular/core';
import {SeleccionarArquetipoService} from '../servicios/seleccionar-arquetipo.service'
import {ConexionBackendService} from '../servicios/conexion-backend.service'

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.css']
})
export class CamposComponent implements OnInit {

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo:SeleccionarArquetipoService) { }

  ngOnInit(): void {

    this.elegirArquetipo.currentArquetipo.subscribe(id_arq => {
      if(id_arq){
        this.conexBack.getArquetipoById(id_arq).subscribe(arquetipo =>{
          console.log(arquetipo)
        })
      }
    })

  }

}
