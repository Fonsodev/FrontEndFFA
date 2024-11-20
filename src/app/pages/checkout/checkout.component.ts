import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { SupplementsService } from '../../service/supplement.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  supplements: any;

  constructor( private cartService: CartService ) {}

  ngOnInit() {
    this.supplements = this.cartService.items;
  }

  /** Getter */
  get total() {
    return this.cartService.total;
  }

  addOneItem( id: any ) {
    console.log( 'Agrega un item al carrito con ID ' + id );
    this.cartService.addOneItemToCart( id );
    this.supplements = this.cartService.items;
  }

  substractOneItem( id: any ) {
    console.log( 'Resta un item al carrito con ID ' + id );
    this.cartService.substractOneItemToCart( id );
    this.supplements = this.cartService.items;
  }

  remoteItems( id: any ) {
    console.log( 'Elimina un conjunto de items del carrito con el ID ' + id );
    this.cartService.removeToCart( id );
    this.supplements = this.cartService.items;
  }
}


