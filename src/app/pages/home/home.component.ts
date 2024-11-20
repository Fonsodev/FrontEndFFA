import { Component} from '@angular/core';
import data from '../../data/data.json';
import { MealsService } from '../../service/meals.service';
import { CommonModule } from '@angular/common';
import { BanerComponent } from "../baner/baner.component";
import { CartService } from '../../service/cart.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BanerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Meals: any
  constructor(private MealsService: MealsService) {

  }
  ngOnInt():void {
    this.MealsService.getAllMeals().subscribe( (data) => {
      console.log(data)
      this.Meals = data.data
    } )
  }

}
