import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { CourseService } from 'src/app/services/course.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;
  dataListProfile!: any;
  questionsList!: any;
  listCategory!:any;
  checkList:any;
  courseData!:any;
  form: FormGroup;
  get auth(){
    return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
  }
  constructor(private sessionStorage: SessionStorageService,
    private profile: ProfileService,
    private formBuilder: FormBuilder,
    private course: CourseService,
    private router: Router,
    private quiz: QuizService) {
      this.form = this.formBuilder.group({
        selectedSkills: new FormArray([]),
      });
     }

  onCheckboxChange(event: any) {
    console.log('change');
    const selectedSkills = this.form.controls['selectedSkills'] as FormArray;
    if (event.target.checked) {
      selectedSkills.push(new FormControl(event.target.value));
    } else {
      const index = selectedSkills.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedSkills.removeAt(index);
    }
  }

  submit() {
    const resp:any = [];
    resp.push(this.form.value);
    let data = resp[0].selectedSkills;
    data.map((res:any) => {
      let separados = res.split(',');
      console.log(separados[0], separados[1])
      this.quiz.addQuiz(this.auth.userID, separados[1], separados[0])
          .subscribe(resp => {
            if(resp){
              this.router.navigate(['panel']);
            }
          })
    })

    //this.router.navigate(['skills/test-skill']);
  }

  routerRedirect(value: number) {
    return ['quiz', value];
  }

  // addCourse(id:number, name:string){
  //   Swal.fire({
  //     title: 'Desea agregar este curso?',
  //     icon: 'success',
  //     showCancelButton: true,
  //     confirmButtonColor: 'rgba(90, 55, 180, 0.7);',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const res:any ={
  //         "name": name
  //       }
  //       this.quiz.addQuiz(this.auth.userID, id, res)
  //         .subscribe(resp => {
  //           console.log(resp);
  //         })
  //     }
  //   })
  // }

  ngOnInit(): void {
    this.profile.validateProfile(this.auth.userID);
    this.profile.showProfile(this.auth.userID)
      .subscribe((resp:any) => {
        this.dataListProfile = resp;
      });

    this.course.showCourses()
      .subscribe(resp => {
        console.log(resp);
        this.courseData = resp;
      })

  }

}
