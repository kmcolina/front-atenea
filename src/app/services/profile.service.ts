import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_URL:any = environment.baseUri
  constructor(private http: HttpClient,
    private router: Router) { }
  
  addProfile(obj:any, id:number):Observable<any>{
    return this.http.post(`${this.API_URL}/api/profile/${id}`, obj);
  }

  showProfile(id:number){
    return this.http.get(`${this.API_URL}/api/profile/${id}`)
  }

  validateProfile(id:number){
    this.http.get(`${this.API_URL}/api/profile/${id}`)
      .subscribe(resp => {
          if(resp === null || resp === undefined || resp === empty){
            this.router.navigate(['panel/perfil']);
          }
      })
  }
}
