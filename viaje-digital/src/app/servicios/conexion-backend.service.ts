import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionBackendService {

  url_import = 'http://127.0.0.1:8000/arquetipos/';
  url_update_db = 'http://127.0.0.1:8000/configurarDataBase/';

  constructor(private httpClient:HttpClient) { }

  getArquetipos() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.url_import);
  }
  
  getArquetipoById(id_arq:string): Observable<any>{
    return this.httpClient.get<any>(this.url_import+id_arq+"/");
  }
  /*putPatient(patient_journey:any): Observable<any>{
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    //delete patient_journey["_id"]
    return this.httpClient.put(this.url_pacientes + patient_journey["rut"] + "/", patient_journey, httpOptions )
  }*/
  cambiarDataBase(idioma:any): Observable<any>{
    return this.httpClient.put(this.url_update_db, idioma);
  }
}
