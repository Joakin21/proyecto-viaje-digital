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
  getToken() {
    return this.cookies.get("token");
  }

}
