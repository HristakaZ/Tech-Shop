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
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { GetProductByIdComponent } from './product/get-product-by-id/get-product-by-id.component';
import { GetAllOrdersComponent } from './order/get-all-orders/get-all-orders.component';
import { MyOrdersComponent } from './order/my-orders/my-orders.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/logout', component: LogoutComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/getall', component: GetAllUsersComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'user/update/:id', component: UpdateUserComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'user/delete/:id', component: DeleteUserComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'category/getall', component: GetAllCategoriesComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'category/create', component: CreateCategoryComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'category/update/:id', component: UpdateCategoryComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'category/delete/:id', component: DeleteCategoryComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'product/getall', component: GetAllProductsComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'product/create', component: CreateProductComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'product/update/:id', component: UpdateProductComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'product/delete/:id', component: DeleteProductComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'product/getById/:id', component: GetProductByIdComponent, canActivate: [AuthenticationAuthorizationGuard] },
  { path: 'order/getall', component: GetAllOrdersComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.adminRole } },
  { path: 'order/myorders', component: MyOrdersComponent, canActivate: [AuthenticationAuthorizationGuard], data: { role: RoleConstants.userRole } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
