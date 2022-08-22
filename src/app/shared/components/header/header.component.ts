import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;
  showModerator = false;
  username?: string;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // this.isLoggedIn = this.storage.isLogged();
    // if (this.isLoggedIn) {
    //   const user = this.storage.getUser();
    //   this.roles = user.roles;
    //   this.showAdmin = this.roles.includes('ROLE_ADMIN');
    //   this.showModerator = this.roles.includes('ROLE_MODERATOR');
    //   this.username = user.username;
    // }
  }

  logout(): void {
    //this.isLoggedIn = false;
    //this.storage.clean();
    //window.location.reload();
    this.router.navigate(["/"]);
  }

}
