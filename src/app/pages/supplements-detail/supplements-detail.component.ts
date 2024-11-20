import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { SupplementsService } from '../../service/supplement.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Supplements } from '../../interfaces/supplement';

@Component({
  selector: 'app-supplements-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './supplements-detail.component.html',
  styleUrl: './supplements-detail.component.css'
})
export class SupplementsDetailComponent {
  supplement: any;

  constructor(private CartService : CartService, private supplementsCart: SupplementsService, private activatedRoute: ActivatedRoute){

  }
  ngOnInit() {
    this.activatedRoute.params.subscribe( ( data: any ) => {
      console.log( data.id );

      this.supplementsCart.getSupplementsbyId(data.id).subscribe( ( data ) => {
        console.log( data.data );
        this.supplement = data.data
      });
    });
  }
  addToCart(supplement: any): void{
    this.CartService.addToCart(supplement);

  }
}
