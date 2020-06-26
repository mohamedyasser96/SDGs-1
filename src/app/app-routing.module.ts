import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PsProfileComponent } from './private-sector/ps-profile/ps-profile.component';
import { ProjectsHomeComponent } from './projects/home-page/projects-home/projects-home.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'',
    component:LandingPageComponent
  },
  {
    path:'privateSector/profile',
    component:PsProfileComponent
  },
  {
    path:'projects/home',
    component:ProjectsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
