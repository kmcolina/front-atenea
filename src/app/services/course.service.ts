import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  API_URL: any = environment.baseUri;
  constructor(private http: HttpClient) { }

  showCourses(): Observable<any>{
    return this.http.get(`${this.API_URL}/api/course`)
  }

  showCourseById(id:number): Observable<any>{
    return this.http.get(`${this.API_URL}/api/course/${id}`)
  }
}
