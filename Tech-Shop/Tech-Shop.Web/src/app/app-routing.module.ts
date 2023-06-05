import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthenticationAuthorizationGuard } from './user/guards/authentication-authorization.guard';
import { RoleConstants } from './user/constants/role-constants';
import { RegisterComponent } from './user/register/register.component';
import { GetAllUsersComponent } from './user/get-all-users/get-all-users.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { GetAllCategoriesComponent } from './category/get-all-categories/get-all-categories.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { GetAllProductsComponent } from './product/get-all-products/get-all-products.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/logout', component: LogoutComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/getall', component: GetAllUsersComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role : RoleConstants.adminRole} },
  { path: 'user/update/:id', component: UpdateUserComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'user/delete/:id', component: DeleteUserComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'category/getall', component: GetAllCategoriesComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'category/create', component: CreateCategoryComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role : RoleConstants.adminRole } },
  { path: 'category/update/:id', component: UpdateCategoryComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role : RoleConstants.adminRole } },
  { path: 'category/delete/:id', component: DeleteCategoryComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role : RoleConstants.adminRole } },
  { path: 'product/getall', component: GetAllProductsComponent, canActivate: [AuthenticationAuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
