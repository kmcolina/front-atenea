import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URI = environment.baseUri
  constructor(private http: HttpClient) {}

  showCategory():Observable<any>{
    return this.http.get(`${this.API_URI}/api/category`);
  }
}
