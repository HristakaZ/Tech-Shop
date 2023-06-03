import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthenticationAuthorizationGuard } from './user/guards/authentication-authorization.guard';
import { RoleConstants } from './user/constants/role-constants';
import { RegisterComponent } from './user/register/register.component';
import { GetAllUsersComponent } from './user/get-all-users/get-all-users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/logout', component: LogoutComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/getall', component: GetAllUsersComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role : RoleConstants.adminRole} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
