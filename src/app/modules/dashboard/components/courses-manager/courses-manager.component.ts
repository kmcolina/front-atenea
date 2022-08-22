import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-courses-manager',
  templateUrl: './courses-manager.component.html',
  styleUrls: ['./courses-manager.component.scss']
})
export class CoursesManagerComponent implements OnInit {
  private SESSION_KEY:any = environment .sessionToken;
  confirmCreated: boolean = false;
  get auth() {
    return this.sessionStorage.getJsonValue(this.SESSION_KEY);
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  courseRegistratiomForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private sessionStorage: SessionStorageService,
    private categoria: CategoryService,
    private question: QuestionService) { 
      this.courseRegistratiomForm = this.fb.group({
        nameFormControl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      });
    }

    getCourseName() {
      return this.courseRegistratiomForm.get('nameFormControl');
    }

    invalidData(campo: string) {
      return this.courseRegistratiomForm.controls[campo].errors && this.courseRegistratiomForm.controls[campo].touched;
    }

    get ErrorDate(): string {
      const courseName = this.courseRegistratiomForm.get('nameFormControl')?.errors;
  
       if (courseName?.['required']) {
         return "Debe ingresar un nombre";
       } else if (this.getCourseName()?.hasError('minlength')) {
         return "Mínimo 2 caracteres";
       } else if (courseName?.['pattern']) {
         return "No se permiten caracteres especiales";
       }
  
       return '';
    }

    addCourse(){
      alert("Hola" + this.getCourseName()?.value);
    }

  ngOnInit(): void {
    // console.log(this.auth);
 
     this.categoria.showCategory()
       .subscribe(resp => {
         console.log(resp);
       });
 
     this.question.showQuestion()
       .subscribe(resp => {
         console.log(resp);
       });
 
     this.question.showQuestionById(4)
       .subscribe(resp => {
         console.log(resp);
       })
   }
 
   created(){
     return this.confirmCreated = true;
   }
}
