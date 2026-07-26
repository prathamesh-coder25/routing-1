import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsComponent } from './component/products/products.component';
import { FairsComponent } from './component/fairs/fairs.component';
import { ProductSComponent } from './component/products/product-s/product-s.component';
import { ProductFormComponent } from './component/products/product-form/product-form.component';
import { UserFormComponent } from './component/users/user-form/user-form.component';
import { UserDetailsComponent } from './component/users/user-details/user-details.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AuthComponent } from './component/auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { UserRoleGuard } from './services/userRole.guard';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { FairDetailsComponent } from './component/fairs/fair-details/fair-details.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home', // BASE_URL
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    }
  },
  // {
  //   path: '', // BASE_URL/home
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'users', //base_url/users
    component: UsersComponent,
    title: 'Users',
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRoles: ['admin', 'superAdmin']
    },
    children: [
      {
        path: 'addUser',
        component: UserFormComponent
      },
      {
        path: ':userid',
        component: UserDetailsComponent
      },
      {
        path: ':userid/edit',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {
    path: 'products', //base_url/products
    component: ProductsComponent,
    title: 'Products',
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRoles: ['buyer', 'admin', 'superAdmin']
    },
    children: [
      {
        path: 'addProduct', //base_url/products
        component: ProductFormComponent
      },
      {
        path: ':productid', //base_url/products
        component: ProductSComponent,
      },
      {
        path: ':productid/edit', //base_url/products
        component: ProductFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },

  {
    path: 'fairs', //base_url/fairs
    component: FairsComponent,
    title: 'Fairs',
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRoles: ['superAdmin']
    },
    children: [
      {
        path: ':fairsId',
        component: FairDetailsComponent

      }
    ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      msg: `Page not Found using static data !!!`
    }
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
