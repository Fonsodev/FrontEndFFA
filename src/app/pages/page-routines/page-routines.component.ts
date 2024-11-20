import { Component } from '@angular/core';
import { BanerComponent } from '../baner/baner.component';
import { BanerPrincipalComponent } from '../components/baner-principal/baner-principal.component';
import { RouterLink } from '@angular/router';
import { RoutineService } from '../../service/routine.service';

@Component({
  selector: 'app-page-routines',
  standalone: true,
  imports: [BanerComponent, BanerPrincipalComponent, RouterLink],
  templateUrl: './page-routines.component.html',
  styleUrl: './page-routines.component.css'
})
export class PageRoutinesComponent {
}
