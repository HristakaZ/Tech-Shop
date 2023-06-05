import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackButtonComponent } from './utilities/back-button/back-button.component';
import { ToolbarComponent } from './utilities/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './user/services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './user/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthenticationAuthorizationService } from './user/services/authentication-authorization.service';
import { AuthenticationAuthorizationGuard } from './user/guards/authentication-authorization.guard';
import { RegisterComponent } from './user/register/register.component';
import { GetAllUsersComponent } from './user/get-all-users/get-all-users.component';
import { MatTableModule } from '@angular/material/table';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { GetAllCategoriesComponent } from './category/get-all-categories/get-all-categories.component';
import { CategoryService } from './category/services/category.service';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { ProductService } from './product/services/product.service';
import { GetAllProductsComponent } from './product/get-all-products/get-all-products.component';
@NgModule({
  declarations: [
    AppComponent,
    BackButtonComponent,
    ToolbarComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    GetAllUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    GetAllCategoriesComponent,
    UpdateCategoryComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    GetAllProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [
    UserService,
    AuthenticationAuthorizationService,
    AuthenticationAuthorizationGuard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
