import { Component } from '@angular/core';
import { BanerComponent } from "../baner/baner.component";
import { BanerPrincipalComponent } from "../components/baner-principal/baner-principal.component";

@Component({
  selector: 'app-page-meals',
  standalone: true,
  imports: [BanerComponent, BanerPrincipalComponent],
  templateUrl: './page-meals.component.html',
  styleUrl: './page-meals.component.css'
})
export class PageMealsComponent {

}
