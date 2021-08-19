import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ShelfComponent } from './shelf/shelf.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ShelfCreateComponent } from './shelf-create/shelf-create.component';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ShelfEditComponent } from './shelf-edit/shelf-edit.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { VerifyPasswordDirective } from './directives/verify-password.directive';
import { SidebarModule } from 'ng-sidebar';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GravatarDirective } from './directives/gravatar.directive';
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { WildcardSearchFilterPipePipe } from './pipes/wildcard-search-filter-pipe.pipe';
import { MobilenavComponent } from './mobilenav/mobilenav.component';

const appRoutes: Routes = [
  {
    path: 'productlist',
    component: ProductComponent,
    data: { title: 'Product List' }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'product-details/delete/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'product-create',
    component: ProductCreateComponent,
    data: { title: 'Create Product' }
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  },
  {
    path: 'shelflist',
    component: ShelfComponent,
    data: { title: 'Shelf List' }
  },
  {
    path: 'shelf-details/:id',
    component: ShelfDetailComponent,
    data: { title: 'Shelf Details' }
  },
  {
    path: 'shelf-details/delete/:id',
    component: ShelfDetailComponent,
    data: { title: 'Shelf Details' }
  },
  {
    path: 'shelf-create',
    component: ShelfCreateComponent,
    data: { title: 'Create Shelf' }
  },
  {
    path: 'shelf-edit/:id',
    component: ShelfEditComponent,
    data: { title: 'Edit Shelf' }
  },
  {
    path: 'supplierlist',
    component: SupplierComponent,
    data: { title: 'Supplier List' }
  },
  {
    path: 'supplier-details/:id',
    component: SupplierDetailComponent,
    data: { title: 'Supplier Details' }
  },
  {
    path: 'supplier-details/delete/:id',
    component: SupplierDetailComponent,
    data: { title: 'Supplier Details' }
  },
  {
    path: 'supplier-create',
    component: SupplierCreateComponent,
    data: { title: 'Create Supplier' }
  },
  {
    path: 'supplier-edit/:id',
    component: SupplierEditComponent,
    data: { title: 'Edit Supplier' }
  },
  {
    path: 'userlist',
    component: UserComponent,
    data: { title: 'User List' }
  },
  {
    path: 'user-details/:id',
    component: UserDetailComponent,
    data: { title: 'User Details' }
  },
  {
    path: 'user-details/delete/:id',
    component: UserDetailComponent,
    data: { title: 'User Details' }
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
    data: { title: 'Create User' }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: { title: 'Edit User' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  { path: '',
    component: AppComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SupplierComponent,
    ShelfComponent,
    ProductComponent,
    ProductDetailComponent,
    ShelfDetailComponent,
    SupplierDetailComponent,
    ProductCreateComponent,
    ShelfCreateComponent,
    SupplierCreateComponent,
    ProductEditComponent,
    ShelfEditComponent,
    SupplierEditComponent,
    UserComponent,
    UserDetailComponent,
    UserEditComponent,
    UserCreateComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    VerifyPasswordDirective,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    GravatarDirective,
    WildcardSearchFilterPipePipe,
    MobilenavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, useHash: true} // <-- debugging purposes only
    ),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    SidebarModule.forRoot(),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
