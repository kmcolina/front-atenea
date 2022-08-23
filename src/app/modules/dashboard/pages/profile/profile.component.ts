import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';

import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  atenea = '/assets/atenea.jpg';
  hidePassword = true;
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  directionFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  SESSION_TOKEN:any = environment.sessionToken;
  constructor(private profile: ProfileService,
    private sessionStorage: SessionStorageService,
    private snackbar: MatSnackBar,
    private router: Router) { }

    get auth(){
      return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
    }

  loginUser() {
    if (
      !this.firstNameFormControl.valid ||
      !this.lastNameFormControl.valid ||
      !this.directionFormControl.valid||
      !this.phoneFormControl.valid
    )
      return;
    
      const obj:any = { first_name: this.firstNameFormControl?.value, 
                        last_name: this.lastNameFormControl?.value, 
                        direction: this.directionFormControl?.value,
                        phone: this.phoneFormControl?.value,
                  }

      console.log(obj);
      this.profile.addProfile(obj, this.auth.userID).subscribe({
        next: data => {
          this.router.navigate(['/panel/cursos']);
        },
        error: err => {
          console.log(err);
          this.mostrarSnakebar(err.error.message)
        }
      });
  }

  ngOnInit(): void {}


  mostrarSnakebar(mensaje: string) {
    this.snackbar.open(mensaje, '', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'notif-danger'
    });
  }


}

