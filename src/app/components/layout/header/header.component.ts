import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get userData(): User | null {
    // Obtenemos datos del usuario autenticado
    return this.authService.userData;
  }

  logout() {
    this.authService.logoutUser().subscribe( data => {

      this.router.navigateByUrl( 'login' );
    } );
  }
}
