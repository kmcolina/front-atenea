import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/core/services/global-variables/global-variables.service';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;
  dataListProfile!: any;
  quizData!:any;
  constructor(private sessionStorage: SessionStorageService,
    private global: GlobalVariablesService,
    private profile: ProfileService,
    private quiz: QuizService,
    private router: Router) { }

  get auth(){
    return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
  }

  routerRedirect(value: number) {
    return ['quiz', value];
  }

  showCourse(id:number){
    this.global.setCategoryValues(id);
    this.router.navigate(['panel/quiz']);
  }

  ngOnInit(): void {
    this.profile.showProfile(this.auth.userID)
      .subscribe((resp:any) => {
        this.dataListProfile = resp;
      });

    this.quiz.showQuiz()
      .subscribe(resp => {
        const data:any = [];
        resp.map((res:any) => {
          if(res.profileId === this.auth.userID){
            //this.quizData = res;
            data.push(res);
          }
        });
        this.quizData = data;
        console.log(data);
      })

  }


}
