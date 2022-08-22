import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;

  constructor(private profile: ProfileService,
    private session: SessionStorageService) { }

    get auth(){
      return this.session.getJsonValue(this.SESSION_TOKEN)
    }

  ngOnInit(): void {
  }

}
