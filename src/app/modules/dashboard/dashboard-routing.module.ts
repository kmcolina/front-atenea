import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActitudesComponent } from './pages/actitudes/actitudes.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { HomeComponent } from './pages/home/home.component';
import { LearningComponent } from './pages/learning/learning.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { QuizComponent } from './pages/quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "perfil",
    component: ProfileComponent
  },
  {
    path: "quiz",
    component: QuizComponent
  },
  {
    path: "quiz/:id",
    component: LearningComponent
  },
  {
    path: "cursos",
    component: CoursesComponent
  },
  // {
  //   path: "actitudes",
  //   component: ActitudesComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
