import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URI = environment.baseApi
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  viewPublic(): Observable<any>{
    return this.http.get(`${API_URI}/test/all`, {responseType: 'text'});
  }

  viewUser(): Observable<any>{
    return this.http.get(`${API_URI}/test/user`, {responseType: 'text'});
  }

  viewModerator(): Observable<any>{
    return this.http.get(`${API_URI}/test/mod`, {responseType: 'text'});
  }

  viewAdministrator(): Observable<any>{
    return this.http.get(`${API_URI}/test/admin`, {responseType: 'text'});
  }
}
