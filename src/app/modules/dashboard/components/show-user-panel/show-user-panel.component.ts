import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/core/services/global-variables/global-variables.service';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { CategoryService } from 'src/app/services/category.service';
import { CourseService } from 'src/app/services/course.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-user-panel',
  templateUrl: './show-user-panel.component.html',
  styleUrls: ['./show-user-panel.component.scss']
})
export class ShowUserPanelComponent implements OnInit {
  SESSION_TOKEN:any = environment.sessionToken;
  dataListProfile!: any;
  questionsList!: any;
  listCategory!:any;
  courseData!:any;
  constructor(private sessionStorage: SessionStorageService,
    private profile: ProfileService,
    private category: CategoryService,
    private course: CourseService,
    private global: GlobalVariablesService) { }

  get auth(){
    return this.sessionStorage.getJsonValue(this.SESSION_TOKEN)
  }

  get categoryId(){
    const data = this.global.getShowCategory();
    return data._value;
  }

  routerRedirect(value: number) {
    return ['quiz', value];
  }

  ngOnInit(): void {
    this.profile.showProfile(this.auth.userID)
      .subscribe((resp:any) => {
        this.dataListProfile = resp;
      });

    this.course.showCourseById(this.categoryId)
      .subscribe(resp => {
        console.log(resp);
        this.courseData = resp;
      })

    this.category.showCategory()
      .subscribe((resp:any) => {
        const response:any = [];
        resp.map((res:any) => {
          if(res.courses.id === this.categoryId){
            response.push(res);
          }
        });
        this.listCategory = response;
        console.log(this.listCategory);
      });

  }

  

}
