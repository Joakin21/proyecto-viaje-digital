import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionBackendService {

  url_import = 'http://127.0.0.1:8000/arquetipos/';
  url_language_configuration = 'http://127.0.0.1:8000/languageConfiguration/';

  constructor(private httpClient: HttpClient) { }

  getArquetipos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url_import);
  }

  getArquetipoById(id_arq: string): Observable<any> {
    return this.httpClient.get<any>(this.url_import + id_arq + "/");
  }

  changeLanguage(language: any): Observable<any> {
    return this.httpClient.put(this.url_language_configuration, language);
  }

  getCurrentLanguage(): Observable<any> {
    return this.httpClient.get(this.url_language_configuration);
  }
  
}
