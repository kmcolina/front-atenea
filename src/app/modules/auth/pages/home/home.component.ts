import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  atenea = '/assets/MochueloHome.svg';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verifySession();
  }
}
