import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;
  constructor(private sessionStorage: SessionStorageService,
    private profile: ProfileService) { }
    get auth(){
      return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
    }
  ngOnInit(): void {
    this.profile.validateProfile(this.auth.userID);
  }

}
