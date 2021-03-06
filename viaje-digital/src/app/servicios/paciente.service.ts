import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url_pacientes = 'http://127.0.0.1:8000/pacientes/'
  url_pacientes_atendidos = 'http://127.0.0.1:8000/pacientes_atendidos/'
  url_es_atendido = 'http://127.0.0.1:8000/setEsAtendidoAhora/'
  url_skip_patients = 'http://127.0.0.1:8000/getSkipPatients/'
  url_amount_documents = 'http://127.0.0.1:8000/amountDocuments/'
  url_eliminar_paciente = 'http://127.0.0.1:8000/setPatientStatus/'
  url_admin_search = 'http://127.0.0.1:8000/adminSearch/'

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  getPatient(rut: string): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.get(this.url_pacientes + rut + "/", httpOptions);
  }
  getAttendedPatients(id_profesional: number): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.get(this.url_pacientes_atendidos + id_profesional + "/", httpOptions);
  }
  putAttendedPatients(id_profesional: number, ultimos_pacientes_atendidos:any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.put(this.url_pacientes_atendidos + id_profesional + "/", ultimos_pacientes_atendidos, httpOptions);
  }
  putPatient(rut: string, patient_journey: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.put(this.url_pacientes + rut + "/", patient_journey, httpOptions)
  }
  setEsAtendidoAhora(rut: string, es_atendido_ahora: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.put(this.url_es_atendido + rut + "/", es_atendido_ahora, httpOptions)
  }
  postPatient(patient_journey: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.post(this.url_pacientes, patient_journey, httpOptions)
  }
  getToken() {
    return this.cookies.get("token");
  }

  getAllPatients(): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.get(this.url_pacientes, httpOptions);
  }
  getSkipPatients(request: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.post(this.url_skip_patients, request, httpOptions)
  }

  updatePatientStatus(request: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.put(this.url_eliminar_paciente, request, httpOptions);
  }
  adminSearch(request:any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.post(this.url_admin_search, request, httpOptions);
  }
  getAmountDocuments(request:any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.getToken());
    return this.httpClient.post(this.url_amount_documents, request, httpOptions);
  }

}
