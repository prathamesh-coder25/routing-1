import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm !: FormGroup;
  isInEditMode : boolean = false;
  productid !: string;
  productObj !: Iproduct;
  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _routes : ActivatedRoute,
    private _snackBar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.createProductForm();
    this.patchProductData();
   }

  createProductForm() {
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      canReturn: new FormControl(1),
      image: new FormControl(null, [Validators.required])
    })
  }

  onProductAdd() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    return 
  } else {
      let productObj: Iproduct = { ...this.productForm.value, pid: Date.now().toString() }
      this._productService.createProduct(productObj)
        .subscribe({
          next: res => {
            this.productForm.reset()
            this._router.navigate(['/products', res.data.pid])
            this._snackBar.openSnackBar(res.msg)
          },
          error: err => {
            console.log(err); 
          }
        })
    }
  }

  patchProductData(){
     this.productid = this._routes.snapshot.paramMap.get('productid')!
    if (this.productid) {
      this.isInEditMode = true
      this._productService.fetchProductById(this.productid).subscribe({
        next: res => {
          this.productForm.patchValue(res)
        }
      })
    }
  }
  
  onUpdate(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched()
    }else{
      let UPDATED_OBJ: Iproduct = {...this.productForm.value, pid : this.productid}
      this._productService.updateProduct(UPDATED_OBJ)
      .subscribe({
        next : res => {
          console.log(res);
          this.productForm.reset()
          this.isInEditMode = false;
          this._router.navigate(['/products', res.data.pid])
          this._snackBar.openSnackBar(res.msg)
        },
        error : err => {
          console.log(err);
        }
      })
  }
    }
    
}
