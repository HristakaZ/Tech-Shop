import { ApproveOrderDialogComponent } from './order/approve/dialog/approve-order-dialog/approve-order-dialog.component';
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
import { CreateProductComponent } from './product/create-product/create-product.component';
import { MatSelectModule } from '@angular/material/select';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { GetProductByIdComponent } from './product/get-product-by-id/get-product-by-id.component';
import { ReviewService } from './review/services/review.service';
import { CreateReviewComponent } from './review/create-review/create-review.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateReviewDialogComponent } from './review/create-review/dialog/create-review-dialog/create-review-dialog.component';
import { UpdateReviewComponent } from './review/update-review/update-review.component';
import { UpdateReviewDialogComponent } from './review/update-review/dialog/update-review-dialog/update-review-dialog.component';
import { DeleteReviewComponent } from './review/delete-review/delete-review.component';
import { DeleteReviewDialogComponent } from './review/delete-review/dialog/delete-review-dialog/delete-review-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetAllOrdersComponent } from './order/get-all-orders/get-all-orders.component';
import { OrderService } from './order/services/order.service';
import { FinishOrderDialogComponent } from './order/finish/dialog/finish-order-dialog/finish-order-dialog.component';
import { MyOrdersComponent } from './order/my-orders/my-orders.component';
import { CancelOrderDialogComponent } from './order/cancel/dialog/cancel-order-dialog/cancel-order-dialog.component';
import { ReturnOrderDialogComponent } from './order/return/dialog/return-order-dialog/return-order-dialog.component';
import { ApproveReturnDialogComponent } from './order/return/dialog/approve-return-dialog/approve-return-dialog.component';
import { PlaceOrderComponent } from './order/place-order/place-order.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ChangePasswordComponent } from './user/change-password/change-password.component';

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
    GetAllProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    GetProductByIdComponent,
    CreateReviewComponent,
    CreateReviewDialogComponent,
    UpdateReviewComponent,
    UpdateReviewDialogComponent,
    DeleteReviewComponent,
    DeleteReviewDialogComponent,
    GetAllOrdersComponent,
    ApproveOrderDialogComponent,
    FinishOrderDialogComponent,
    MyOrdersComponent,
    CancelOrderDialogComponent,
    ReturnOrderDialogComponent,
    ApproveReturnDialogComponent,
    PlaceOrderComponent,
    ChangePasswordComponent
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
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    NgbModule,
    MatStepperModule
  ],
  providers: [
    UserService,
    AuthenticationAuthorizationService,
    AuthenticationAuthorizationGuard,
    CategoryService,
    ProductService,
    ReviewService,
    OrderService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
