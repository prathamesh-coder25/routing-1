import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsComponent } from './component/products/products.component';
import { FairsComponent } from './component/fairs/fairs.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProductSComponent } from './component/products/product-s/product-s.component';
import { ProductFormComponent } from './component/products/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { GetConfirmComponent } from './component/get-confirm/get-confirm.component';
import { UserFormComponent } from './component/users/user-form/user-form.component';
import { UserDetailsComponent } from './component/users/user-details/user-details.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FairCardComponent } from './component/fairs/fair-card/fair-card.component';
import { FairDetailsComponent } from './component/fairs/fair-details/fair-details.component';
import { AuthComponent } from './component/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ProductsComponent,
    FairsComponent,
    NavbarComponent,
    ProductSComponent,
    ProductFormComponent,
    GetConfirmComponent,
    UserFormComponent,
    UserDetailsComponent,
    PageNotFoundComponent,
    FairCardComponent,
    FairDetailsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
