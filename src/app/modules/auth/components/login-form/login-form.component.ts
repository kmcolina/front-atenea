import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccountDTO } from 'src/app/services/models/accountDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  username: string = '';
  password: string = '';
  show: boolean = false;
  private SESSION_TOKEN = environment
  errorMessage:string = "";
  hidePassword = true;
  loginData: AccountDTO = { Usuario: '', Password: '' };

  pwdFormControl = new FormControl('', [Validators.required]);
  usrFormControl = new FormControl('', [Validators.required]);
  constructor(private authService: AuthService, 
    private snackbar: MatSnackBar,
    private sesionStorage: SessionStorageService,
    private router: Router) { }

  ngOnInit(): void {this.authService.verifySession();}

  loginUser(): void {
    if (!this.usrFormControl.valid || !this.pwdFormControl.valid) return;
    const obj = { username: this.usrFormControl?.value, 
                  password: this.pwdFormControl?.value 
                };
    const session = {
      logged: true,
      username: '',
      email: '',
      accessToken: '',
      userID: '',
      roles: []
    }
    this.authService.login(obj).subscribe({
      next: data => {
        session.userID = data.id;
        session.username = data.username;
        session.email = data.email;
        session.roles = data.roles;
        session.logged = true;
        this.sesionStorage.setJsonValue(this.SESSION_TOKEN.sessionToken, session);
        this.router.navigate(['/panel']);
      },
      error: err => {
        this.mostrarSnakebar("Usuario o password invalidos!");
        session.logged = false;
      }
    });
  }


  submit() {
    this.clear();
  }
  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }

  mostrarSnakebar(mensaje: string) {
    this.snackbar.open(mensaje, '', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'notif-danger'
    });
  }
}


