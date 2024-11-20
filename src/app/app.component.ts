import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from "./pages/home/home.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { SupplementsComponent } from './pages/supplements/supplements.component';
import { BanerComponent } from './pages/baner/baner.component';
import { CheckoutComponent } from "./pages/checkout/checkout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent, SupplementsComponent, BanerComponent, CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-finessforall-angular';
}
