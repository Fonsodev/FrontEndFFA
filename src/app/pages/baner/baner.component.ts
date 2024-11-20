import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { BanerPrincipalComponent } from '../components/baner-principal/baner-principal.component';

@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RegisterComponent, BanerPrincipalComponent],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.css'
})
export class BanerComponent {

}
