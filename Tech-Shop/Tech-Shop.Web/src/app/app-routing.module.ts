import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthenticationAuthorizationGuard } from './user/guards/authentication-authorization.guard';
import { RoleConstants } from './user/constants/role-constants';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/logout', component: LogoutComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'user/register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
