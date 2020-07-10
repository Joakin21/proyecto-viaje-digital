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
export class UserService {

  url_import = 'http://127.0.0.1:8000/auth/'
  url_users = 'http://127.0.0.1:8000/users/'

  constructor(private httpClient:HttpClient, private cookies: CookieService) { }
  
  login(user: any): Observable<any> {
    return this.httpClient.post(this.url_import, user);
  }
  getUser(user:number): Observable<any>{
    httpOptions.headers = httpOptions.headers.set('Authorization', "token "+this.getToken());
    return this.httpClient.get(this.url_users+user+"/", httpOptions);
  }
  logout(){
    this.cookies.delete("token");
    this.cookies.delete("id_user");
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    //damos autorizacion
  }
  getToken() {
    return this.cookies.get("token");
  }
  setIdUser(id_user: string){
    this.cookies.set("id_user",id_user)
  }
  getIdUser(){
    return this.cookies.get("id_user")
  }

}
