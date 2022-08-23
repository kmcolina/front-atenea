import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/core/services/global-variables/global-variables.service';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-main',
  templateUrl: './show-main.component.html',
  styleUrls: ['./show-main.component.scss']
})
export class ShowMainComponent implements OnInit {

  navBarText = ['En Curso', 'Completo', 'Incompleto', 'Explorar'];
  active!: number;
  form!: FormGroup;

  userName!: string;
  location!: string;

  courseSelect: string = '';

  skillsAvaible = [
    {
      title: 'Lenguaje Python',
      name: 'python',
      img: '/assets/python.svg',
    },
    {
      title: 'HTML',
      name: 'html',
      img: '/assets/html.png',
    },
    {
      title: 'CSS',
      name: 'css',
      img: '/assets/css.png',
    },
    {
      title: 'Lenguaje java',
      name: 'java',
      img: '/assets/java.svg',
    },
  ];

  skillsCompletes = [
    {
      title: 'Programación Python Basica',
      name: 'python',
      img: '/assets/python.svg',
    },
  ];

  rakingProfiles = [
    {
      avatar: '/assets/avatar1.svg',
      name: 'Jose Gonzalez',
      location: 'Caracas, Venezuela',
      rval: 995,
    },
    {
      avatar: '/assets/avatar2.svg',
      name: 'Karelys Hurtado',
      location: 'Caracas, Venezuela',
      rval: 954,
    },
    {
      avatar: '/assets/avatar3.svg',
      name: 'Andres Garrido',
      location: 'Miranda, Venezuela',
      rval: 741,
    },
    {
      avatar: '/assets/avatar4.svg',
      name: 'Pedro Martinez',
      location: 'Caracas, Venezuela',
      rval: 584,
    },
    {
      avatar: '/assets/avatar5.svg',
      name: 'Luis Alfaro',
      location: 'Caracas, Venezuela',
      rval: 254,
    },
  ];

  SESSION_TOKEN:any = environment.sessionToken;
  API_URL:any =environment.baseUri;
  dataListProfile!: any;
  quizData!:any;
  constructor(private sessionStorage: SessionStorageService,
    private global: GlobalVariablesService,
    private profile: ProfileService,
    private formBuilder: FormBuilder,
    private quiz: QuizService,
    private router: Router) { 
      this.form = this.formBuilder.group({
        selectedSkills: new FormArray([]),
      });
    }

  get auth(){
    return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
  }

  routerRedirect(value: number) {
    return ['quiz', value];
  }

  showCourse(id:number){
    this.global.setCategoryValues(id);
    this.router.navigate(['panel/quiz']);
  }

  ngOnInit(): void {
    this.profile.validateProfile(this.auth.userID)
    this.profile.showProfile(this.auth.userID)
      .subscribe((resp:any) => {
        this.dataListProfile = resp;
        //console.log(resp);
      });

    this.quiz.showQuiz()
      .subscribe(resp => {
        const data:any = [];
        resp.map((res:any) => {
          if(res.profileId === this.auth.userID){
            //this.quizData = res;
            data.push(res);
          }
        });
        this.quizData = data;
        console.log(data);
      })

  }

  activeItem(item: any) {
    console.log('item', item);
    this.active = item;
    this.courseSelect = '';
    switch (item) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        console.log('invalid option');
        break;
    }
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

  submit(car: any) {
    console.log('car on subnit', car.name);

    this.courseSelect = car.name;
    //enviar al curso correcpondiente con car.name
    //this.router.navigate(['skills/test-skill']);
  }

  close() {
    this.router.navigate(['']);
  }

}
