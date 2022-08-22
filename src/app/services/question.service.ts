import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  API_BASE = environment.baseUri;
  constructor(private http: HttpClient) { }

  showQuestion(){
    return this.http.get(`${this.API_BASE}/api/question`);
  }

  showQuestionById(id:number){
    return this.http.get(`${this.API_BASE}/api/question/${id}`);
  }
}
