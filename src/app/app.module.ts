import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SnackAlertComponent } from './components/snack-alert/snack-alert.component';
import { WraperComponent } from './components/wraper/wraper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardGuard } from './components/guards/auth-guard.guard';
import { AuthInterceptor } from './components/guards/authInterceptor';
import { ProductComponent } from './components/models/product/product.component';
import { UserComponent } from './components/models/user/user.component';
import { CustomerComponent } from './components/models/customer/customer.component';
import { TypeDocumentComponent } from './components/models/type-document/type-document.component';
import { CustomerManagerComponent } from './components/models/customer/components/customer-manager/customer-manager.component';
import { ProductManagerComponent } from './components/models/product/components/product-manager/product-manager.component';
import { TypeDocumentManagerComponent } from './components/models/type-document/components/type-document-manager/type-document-manager.component';
import { UserManagerComponent } from './components/models/user/components/user-manager/user-manager.component';
import { GenerateDocumentComponent } from './components/models/generate-document/generate-document.component';
import { DocumentsComponent } from './components/models/documents/documents.component';

registerLocaleData(localeEs, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LogInComponent,
    SideNavComponent,
    SnackAlertComponent,
    WraperComponent,
    ProductComponent,
    UserComponent,
    CustomerComponent,
    TypeDocumentComponent,
    CustomerManagerComponent,
    ProductManagerComponent,
    TypeDocumentManagerComponent,
    UserManagerComponent,
    GenerateDocumentComponent,
    DocumentsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatStepperModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule,    
    ReactiveFormsModule
  ],
  providers: [AuthGuardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
      }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
