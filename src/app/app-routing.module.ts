import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardGuard} from './components/guards/auth-guard.guard';
import {HomeComponent} from './components/home/home.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {
  CustomerManagerComponent
} from './components/models/customer/components/customer-manager/customer-manager.component';
import {CustomerComponent} from './components/models/customer/customer.component';
import {DocumentsComponent} from './components/models/documents/documents.component';
import {GenerateDocumentComponent} from './components/models/generate-document/generate-document.component';
import {
  ProductManagerComponent
} from './components/models/product/components/product-manager/product-manager.component';
import {ProductComponent} from './components/models/product/product.component';
import {UserManagerComponent} from './components/models/user/components/user-manager/user-manager.component';
import {UserComponent} from './components/models/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent, pathMatch: 'full', title: 'Login' },
  {
    path: 'home', component: HomeComponent, title: 'Home', canActivate: [AuthGuardGuard],
    children: [
      { path: 'customer', component: CustomerComponent, title: 'Customers', canActivate: [AuthGuardGuard] },
      { path: 'customer-manager', component: CustomerManagerComponent, title: 'Manage customers', canActivate: [AuthGuardGuard] },
      { path: 'customer-manager/:id', component: CustomerManagerComponent, title: 'Manage customers', canActivate: [AuthGuardGuard] },

      { path: 'generate', component: GenerateDocumentComponent, title: 'Documents', canActivate: [AuthGuardGuard] },
      { path: 'documents', component: DocumentsComponent, title: 'Documents', canActivate: [AuthGuardGuard] },

      { path: 'user', component: UserComponent, title: 'users', canActivate: [AuthGuardGuard] },
      { path: 'user-manager', component: UserManagerComponent, title: 'Manage users', canActivate: [AuthGuardGuard] },
      { path: 'user-manager/:id', component: UserManagerComponent, title: 'Manage users', canActivate: [AuthGuardGuard] },

      { path: 'product', component: ProductComponent, title: 'product', canActivate: [AuthGuardGuard] },
      { path: 'product-manager', component: ProductManagerComponent, title: 'Manage products', canActivate: [AuthGuardGuard] },
      { path: 'product-manager/:id', component: ProductManagerComponent, title: 'Manage products', canActivate: [AuthGuardGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
