import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuestionService } from 'src/app/services/question.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;
  id:any;
  lesson:boolean = false;
  listQuestions:any;
  result:any;
  favoriteSeason: string | undefined;
  seasons: string[] = ['Winter', 'Spring', 'Summer'];
  correct:any;
  answers:any[] = [];
  anwserQuestion!: string;
  get auth(){
    return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private profile: ProfileService,
    private sessionStorage: SessionStorageService,
    private question: QuestionService) {
    this.id = this.route.params.pipe(map(p => p['id']));
   }

   showQuestions(){
    
   }

   goNext() {
    console.log('respuesta ', this.anwserQuestion);

    this.router.navigate(['panel/perfil']);
  }

  ngOnInit(): void {
    this.profile.validateProfile(this.auth.userID);
    const answers: any[] = [];
    this.question.showQuestionById(this.id.source._value.id)
      .subscribe((resp:any) => {
        resp.question.map((res:any) => {
          console.log(res.correct);
          this.correct = res.correct;
          answers.push(res.answer);
          console.log(res);
        });
        this.answers = resp.question;
        console.log(resp.question);
        this.listQuestions = resp;
      })
  }

}
