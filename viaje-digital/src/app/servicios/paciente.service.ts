import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url_pacientes = 'http://127.0.0.1:8000/pacientes/'

  constructor(private httpClient:HttpClient, private cookies: CookieService) { }

  getPatient(rut:string): Observable<any>{
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.get(this.url_pacientes+rut+"/", httpOptions);
  }
  /* 
  updateArquetipo(arquetipo:any): Observable<any>{
    return this.httpClient.put<any>(this.url_import+arquetipo["_id"]+"/", arquetipo);
  }
  login(user: any): Observable<any> {
    return this.httpClient.post(this.url_import, user);
  }
  */

  putPatient(patient_journey:any): Observable<any>{
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    delete patient_journey["_id"]
    return this.httpClient.put(this.url_pacientes + patient_journey["rut"] + "/", patient_journey, httpOptions )
  }
  postPatient(patient_journey:any): Observable<any>{
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.post(this.url_pacientes + patient_journey["rut"] + "/", patient_journey, httpOptions )
  }
  getToken() {
    return this.cookies.get("token");
  }

}
