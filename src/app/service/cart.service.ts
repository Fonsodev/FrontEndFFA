import { Injectable } from '@angular/core';
import { ItemSupplement } from '../interfaces/item-supplement';
import { SupplementsProduct } from '../interfaces/supplements-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  item!: ItemSupplement;
  total: number = 0;
  private cartProducts: any = []
  private localStoragekey = 'cart'
  constructor() {
    this.localCartFromtLocalStorage();
    this.totalPrice();
    console.log(this.cartProducts)
  }
  get items(){
    return this.cartProducts
  }
  addToCart(SupplementsProduct: SupplementsProduct){
    console.log(SupplementsProduct)
    const productFound = this.cartProducts.find( (productItem: any) => {
      return productItem.info._id === SupplementsProduct._id;
    } );
    console.log(productFound);
    if(! productFound) {
      this.item = {
        info: SupplementsProduct,
        order: 1,
        total: SupplementsProduct.price
      }
      this.cartProducts.push(this.item);
    }
    else if (productFound.order < SupplementsProduct.quantity){
      productFound.order += 1;
      productFound.total = productFound.order * SupplementsProduct.price;
    }
    console.log(this.cartProducts)

    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  removeToCart( id: any ) {
    this.cartProducts = this.cartProducts.filter( ( item: any ) => {
      return item.info._id !== id;
    });

    console.log( this.cartProducts );

    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  addOneItemToCart( id: any ) {
    console.log( id );

    this.cartProducts = this.cartProducts.map( ( item: any ) => {
      if( item.info._id === id ) {
          item.order += 1;
          item.total = item.info.price * item.order;
      }
      return item;
    });

    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  substractOneItemToCart( id: any ) {
    console.log( id );

    this.cartProducts = this.cartProducts.map( ( item: any ) => {
      // Verifico el producto con ID que voy a modificar
      if( item.info._id === id ) {
          item.order -= 1;
          item.total = item.info.price * item.order;
      }

      return item;
    })
    .filter( ( item: any ) => {
      return item.order > 0;
    } );

    this.saveCartToLocalStorage();
    this.totalPrice();
  }


  private saveCartToLocalStorage(){
    localStorage.setItem( this.localStoragekey, JSON.stringify(this.cartProducts))
  }

  private localCartFromtLocalStorage(){
    if(localStorage.getItem(this.localStoragekey)) {
      this.cartProducts = JSON.parse(localStorage.getItem(this.localStoragekey) ! )
    }
    else{
      this.cartProducts = []
    }
  }

  totalPrice() {
    const prices = this.cartProducts.map( ( item: any ) => {
      return item.total;
    });

    console.log( prices );

    this.total = prices.reduce( ( acc: number, current: number ) => {
      return acc + current;
    }, 0 );

  }
}
