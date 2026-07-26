import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Iproduct> = []
  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _routes : ActivatedRoute
  ) { 
    this.products = this._routes.snapshot.data['products']
  }

  ngOnInit(): void {
    this._productService.fetchProducts()
      .subscribe({
        next: data => {
          this.products = data
          if (this.products.length > 0) {
            this._router.navigate([
              '/products',
              this.products[0].pid
            ]);
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

  trackByProductId(index: number, product: Iproduct): string {
    return product.pid;

  }
}