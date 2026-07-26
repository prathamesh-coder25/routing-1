// import { inject, Injectable } from "@angular/core";
// import { Iproduct } from "../models/product";
// import { ProductsService } from "./products.service";
// import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";
// import { Observable } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })


// export class ProductsResolver implements Resolve<Iproduct[]>{
//     private _productService = inject(ProductsService)

//     constructor(private productService: ProductsService) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct[]> {
//         return this._productService.fetchProducts()
//     }
// }