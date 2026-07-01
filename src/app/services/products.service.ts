import { Injectable } from '@angular/core';
import { Iproduct, Ires } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
productsArr: Array<Iproduct> =[
  {
    pname: 'Samsung M31',
    pid: '123',
    pstatus: 'In-Progress',
    canReturn: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn84GU6XebWk6PyLJCRI0pWpyqK7f-1CQAd9Q_Lvg6ew&s=10'
  },
  {
    pname: 'iPhone 14',
    pid: '124',
    pstatus: 'Delivered',
    canReturn: 0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-v0Hww_FA6OZ0K2Lbk-dnXOpaSZg8hgl4bmfL5Eg8Bw&s=10'
  },
  {
    pname: 'OnePlus 11',
    pid: '125',
    pstatus: 'Dispatched',
    canReturn: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dHfUonctt7rK_AiybvRl58TXUO9iOOK_HKPBEIE-rg&s=10'
  },
  {
    pname: 'Realme Narzo 60',
    pid: '126',
    pstatus: 'Delivered',
    canReturn: 0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfgcOaCYK-7zFMOydzKjQNZSek2RAJ61WX_mGhkacuA&s=10'
  },
  {
    pname: 'Vivo V29',
    pid: '127',
    pstatus: 'Dispatched',
    canReturn: 1,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTRR4ZGAt8mNf4KyLyFZoybDuvplCLycAy9fQv1w2wqJnDWm_5MOYad7jtexVpaof5yHPc2JKryhscyNB8qnmOzqEPFDrZiNSuW27Fnf8jhf3EZyW1qvu51O7RPHlqQ&usqp=CAc'
  },
  {
    pname: 'Oppo Reno 10',
    pid: '128',
    pstatus: 'Delivered',
    canReturn: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_w_qod2HnLTCGI9gpfTv0S_YoJGehZhQ9QtU4AK618w&s=10'
  },
  {
    pname: 'Google Pixel 8',
    pid: '129',
    pstatus: 'In-Progress',
    canReturn: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWL19SRqFfKtF4j-8Pe_naPnEt3hIt5NcTvaCGVDJew&s=10'
  },
  {
    pname: 'Nothing Phone 2',
    pid: '130',
    pstatus: 'Delivered',
    canReturn: 0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXtc17H6fbnn76YrW9dwmY4WWl6h_M_h4bIQWtOTwgw&s=10'
  },
  {
    pname: 'Motorola Edge 50',
    pid: '131',
    pstatus: 'In-Progress',
    canReturn: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXtc17H6fbnn76YrW9dwmY4WWl6h_M_h4bIQWtOTwgw&s=10'
  },
  {
    pname: 'Xiaomi Redmi Note 13',
    pid: '132',
    pstatus: 'Dispatched',
    canReturn: 0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMMjUXdQRSCUWUQ-4qnP-gYksxDuQva8QTdzh_Vjm0dQ&s=10'
  }
]

  constructor() { }


fetchProducts(): Observable<Iproduct[]>{
  return of(this.productsArr)
}

fetchProductById(id:string): Observable<Iproduct>{
let productObj = this.productsArr.find(p => p.pid === id)!
return of(productObj)
}

createProduct(product:Iproduct): Observable<Ires<Iproduct>>{
  this.productsArr.unshift(product)

  return of ({
    msg : `The new product with id ${product.pid} is created successfully !!!`,
    data : product
  })
}

updateProduct(product : Iproduct): Observable<Ires<Iproduct>>{
  let getIndex = this.productsArr.findIndex(p => p.pid === product.pid)
  this.productsArr[getIndex] = product
  return of ({
    msg : `The product with id ${product.pid} is updated successfully !!!`,
    data : product
  })
}

removeProduct(id:string): Observable<Ires<Iproduct>>{
  let getIndex = this.productsArr.findIndex(p => p.pid === id)
  let product = this.productsArr.splice(getIndex, 1)
  return of ({
    msg : `The product with id ${product[0].pid} is removed successfully !!!`,
    data : product[0]
  })
}
}


