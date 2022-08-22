import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from '../core/services/session-storage/session-storage.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//   })
  // .set('Accept', 'application/json')
  //   .set('Content-Type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*')
  //   .set('X-IBM-Client-Id', '81188330-c768-46fe-a378-ff3ac9e88824')
  //   .set('Access-Control-Allow-Credentials', 'true')
  //   .set("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT")
//};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API: any = environment.baseApiAuth;
  private SESSION_KEY:any = environment.sessionToken;
  constructor(private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private router: Router) {}

  login(obj:any): Observable<any>{
    return this.http.post(`${this.AUTH_API}signin`, obj, /*httpOptions*/);
  }

  register(obj:any): Observable<any>{
    return this.http.post(`${this.AUTH_API}signup`, obj, /*httpOptions*/);
  }

  logout(): Observable<any>{
    return this.http.post(`${this.AUTH_API}/signout`, {}, /*httpOptions*/);
  }

  verificaAutenticacion() {
    if (!this.sessionStorage.getJsonValue(this.SESSION_KEY)) {
      return false;
    }
    return true;
  }

  verifySession(){
    if(this.verificaAutenticacion()){
      this.router.navigate(['/panel']);
    }
  }
}
