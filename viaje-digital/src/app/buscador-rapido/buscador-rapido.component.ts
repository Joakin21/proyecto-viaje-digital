import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConexionBackendService } from '../servicios/conexion-backend.service'
import { SeleccionarArquetipoService } from '../servicios/seleccionar-arquetipo.service'

@Component({
  selector: 'app-buscador-rapido',
  templateUrl: './buscador-rapido.component.html',
  styleUrls: ['./buscador-rapido.component.css']
})
export class BuscadorRapidoComponent implements OnInit {
  arquetipos:any[] = []
  buscarArquetipo = ''
  placeholder_buscador = 'Buscar arquetipo...';
  @Output() emitir_id_arquetipo = new EventEmitter<string>();

  constructor(private conexBack: ConexionBackendService, private elegirArquetipo: SeleccionarArquetipoService) { }

  ngOnInit(): void {

    this.conexBack.getArquetipos().subscribe(
      data => {
        this.arquetipos = data
      },
      error =>{
        console.log(error)
      }
    );
  }
  agregarAlHistorial(arquetipo: any) {
    let arquetipo_id = arquetipo["id"] ?? arquetipo["_id"]

    //MEJORAR LOGICA DE COMO SE TRANSFIERE ESTA INFORMACIÓN ENTRE COMPONENTES
    this.conexBack.getArquetipoById(arquetipo_id).subscribe(
      arquetipo => {
        console.log(arquetipo)
        this.emitir_id_arquetipo.emit(arquetipo["_id"])
        this.elegirArquetipo.agregarAlHistorial(arquetipo)
        this.buscarArquetipo = ''
      },
      error => {
        console.log(error)
      }
    );
  }

}
