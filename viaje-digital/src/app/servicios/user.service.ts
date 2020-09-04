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
export class UserService {

  url_import = 'http://127.0.0.1:8000/auth/'
  url_users = 'http://127.0.0.1:8000/users/'
  url_admin = 'http://127.0.0.1:8000/adminPatientJourney/'

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.url_import, user);
  }
  getUser(user: number): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', "token " + this.getToken());
    return this.httpClient.get(this.url_users + user + "/", httpOptions);
  }
  getAdmin(user: number): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', "token " + this.getToken());
    return this.httpClient.get(this.url_admin + user + "/", httpOptions);
  }

  logout() {
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
  setIdUser(id_user: string) {
    this.cookies.set("id_user", id_user)
  }
  getIdUser() {
    return this.cookies.get("id_user")
  }
  getAllUsers(): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', "token " + this.getToken());
    return this.httpClient.get(this.url_users, httpOptions);
  }
  createUser(new_user: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', "token " + this.getToken());
    return this.httpClient.post(this.url_users, new_user, httpOptions);
  }
  deleteUser(user_id: number): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', "token " + this.getToken());
    return this.httpClient.delete(this.url_users + user_id.toString() + "/", httpOptions);
  }

  updateUser(user_updated: any, user_id: number): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', "token " + this.getToken());
    return this.httpClient.put(this.url_users + user_id.toString() + "/", user_updated, httpOptions);
  }

}
