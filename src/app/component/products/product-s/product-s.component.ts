import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-product-s',
  templateUrl: './product-s.component.html',
  styleUrls: ['./product-s.component.scss']
})
export class ProductSComponent implements OnInit {
  productid !: string
  productObj !: Iproduct
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductsService,
    private _router: Router,
    private _snackBar: SnackbarService,
    private _matdialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this._routes.params.subscribe(params => {
      this.productid = params['productid']
      this._productService.fetchProductById(this.productid)
        .subscribe({
          next: data => {
            this.productObj = data
          },
          error: err => {
            console.log(err);
          }
        })
    })
  }

  onRemove() {
    let matConfig = new MatDialogConfig()
    matConfig.width = '400px';
    matConfig.disableClose = true
    matConfig.data = `Are you sure, you want to remove the product with id ${this.productid}`
    let matRef = this._matdialog.open(GetConfirmComponent, matConfig)
    matRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this._productService.removeProduct(this.productid).subscribe({
            next: res => {
              this._snackBar.openSnackBar(res.msg)
              this._productService.fetchProducts().subscribe(products => {
                if (products.length > 0) {
                  this._router.navigate(['/products', products[0].pid]);
                } else {
                  this._router.navigate(['/products']);
                }
              });
            },
          error: err => {
              console.log(err)
            }
        });
  }
});
  }
}
