import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsComponent } from './component/products/products.component';
import { FairsComponent } from './component/fairs/fairs.component';
import { ProductSComponent } from './component/products/product-s/product-s.component';
import { ProductFormComponent } from './component/products/product-form/product-form.component';

const routes: Routes = [
  {
    path: 'home', // BASE_URL
    component: HomeComponent
  },
  {
    path: '', // BASE_URL/home
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'users', //base_url/users
    component: UsersComponent
  },
  {
    path: 'products', //base_url/products
    component: ProductsComponent,
    children: [
      {
        path: 'addProduct', //base_url/products
        component: ProductFormComponent
      },
      {
        path: ':productid', //base_url/products
        component: ProductSComponent
      },
      {
        path: ':productid/edit', //base_url/products
        component: ProductFormComponent
      }
    ]
  },

  {
    path: 'fairs', //base_url/fairs
    component: FairsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
