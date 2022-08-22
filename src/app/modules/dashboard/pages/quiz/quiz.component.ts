import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;
  get auth(){
    return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
  }
  constructor(private profile: ProfileService,
    private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.profile.validateProfile(this.auth.userID);
  }

}
