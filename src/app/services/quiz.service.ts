import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  API_URL:any = environment.baseUri
  constructor(private http: HttpClient) { }

  addQuiz(idProfile:number, idCourse:number,obj:string): Observable<any>{
    return this.http.post(`${this.API_URL}/api/quiz/${idProfile}/${idCourse}`, obj);
  }

  showQuiz(): Observable<any>{
    return this.http.get(`${this.API_URL}/api/quiz`);
  }

  showQuizById(id:number): Observable<any>{
    return this.http.get(`${this.API_URL}/api/quiz/${id}`);
  }
}
