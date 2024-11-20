import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { SupplementsService } from '../../service/supplement.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-supplements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-supplements.component.html',
  styleUrl: './page-supplements.component.css'
})
export class PageSupplementsComponent {
  supplements: any[] = [];

  constructor(private CartService : CartService, private supplementsCart: SupplementsService){

  }
  ngOnInit() {
    this.supplementsCart.getAllSupplements().subscribe( (data) => {
      console.log(data.data)
      this.supplements = data.data
    })
  }
  addToCart(supplement: any): void{
    this.CartService.addToCart(supplement);

  }
}
