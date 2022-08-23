import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AccountDTO } from 'src/app/services/models/accountDto';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  username: string = '';
  password: string = '';
  show: boolean = false;

  hidePassword = true;
  loginData: AccountDTO = { Usuario: '', Password: '' };
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pwdFormControl = new FormControl('', [Validators.required]);
  usrFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  loginUser() {
    if (
      !this.usrFormControl.valid ||
      !this.pwdFormControl.valid ||
      !this.emailFormControl.valid
    )
      return;
    
      const obj:any = { username: this.usrFormControl?.value, 
                    email: this.emailFormControl?.value, 
                    password: this.pwdFormControl?.value 
                  }
    this.authService.register(obj).subscribe({
      next: data => {
        this.router.navigate(['/panel']);
        console.log(data);
      },
      error: err => {
        console.log(err);
        this.mostrarSnakebar(err.error.message);
      }
    });
  }

  submit() {
    console.log('user name is ' + this.username);
    this.clear();
  }
  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }


  ngOnInit(): void {this.authService.verifySession()}

  mostrarSnakebar(mensaje: string) {
    this.snackbar.open(mensaje, '', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'notif-danger'
    });
  }

  

}
