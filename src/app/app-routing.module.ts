import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ListComponent } from './dashboard/list/list.component';
import { ListVoteComponent } from './dashboard/list-vote/list-vote.component';
import { ListOverviewComponent } from './dashboard/list-overview/list-overview.component';

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'list/:id', component: ListComponent},
  {path: 'listVote/:id', component: ListVoteComponent},
  {path: 'listOverview', component: ListOverviewComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
