// import { inject, Injectable } from '@angular/core';
// import {
//   Router, Resolve,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot
// } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { ProductsService } from './products.service';
// import { Iproduct } from '../models/product';

// @Injectable({
//   providedIn: 'root'
// })
// export class NewProductResolver implements Resolve<Iproduct | Iproduct[]> {
//   private _productsService = inject(ProductsService)
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct | Iproduct[]> {
//     let productid = route.paramMap.get('productid')

//     if(productid){
//       return this._productsService.fetchProductById(productid)
//     }else{
//       return this._productsService.fetchProducts()
//     }
//   }
// }
