import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesManagerComponent } from './components/courses-manager/courses-manager.component';
import { ShowUserPanelComponent } from './components/show-user-panel/show-user-panel.component';
import { ProfileManagerComponent } from './components/profile-manager/profile-manager.component';
import { LearningComponent } from './pages/learning/learning.component';
import { ShowCoursesComponent } from './components/show-courses/show-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './pages/courses/courses.component';
import { ActitudesComponent } from './pages/actitudes/actitudes.component';
import { ShowMainComponent } from './components/show-main/show-main.component';


@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    DashboardComponent,
    QuizComponent,
    AdministrationComponent,
    CoursesManagerComponent,
    ShowUserPanelComponent,
    ProfileManagerComponent,
    LearningComponent,
    ShowCoursesComponent,
    CoursesComponent,
    ActitudesComponent,
    ShowMainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
