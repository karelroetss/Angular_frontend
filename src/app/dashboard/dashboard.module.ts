import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component'
import { RouterModule } from '@angular/router';
import { ListVoteComponent } from './list-vote/list-vote.component';
import { ListOverviewComponent } from './list-overview/list-overview.component';

@NgModule({
  declarations: [DashboardComponent, ListComponent, ListVoteComponent, ListOverviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
