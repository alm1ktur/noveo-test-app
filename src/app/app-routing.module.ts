import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { RecordsContainerComponent } from './records/records-container/records-container.component';
import { LoginGuard } from './guards/login.guard';
import { RecordsDetailComponent } from './records/records-detail/records-detail.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/records'
}, {
  path: 'login',
  component: LoginFormComponent
}, {
  path: 'records',
  component: RecordsContainerComponent,
  canActivate: [LoginGuard]
}, {
  path: 'records/:id',
  component: RecordsDetailComponent,
  canActivate: [LoginGuard]
}, {
  path: '**',
  redirectTo: '/records',
  canActivate: [LoginGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
