import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_import = 'http://127.0.0.1:8000/auth/'

  constructor(private httpClient:HttpClient) { }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.url_import, user);
  }
}
