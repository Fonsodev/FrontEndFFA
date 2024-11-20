import { Component } from '@angular/core';
import { RoutineService } from '../../service/routine.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routines-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routines-list.component.html',
  styleUrl: './routines-list.component.css',
})
export class RoutinesListComponent {
  routines: any[] = [];

  constructor(private routinesService: RoutineService, 
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.routinesService.getAllRoutines().subscribe((routine) => {
      console.log(routine);
      this.routines = routine.data;
    });
  }

  editar(id: any) {
    console.log(`editar producto ${id}`);
    this.router.navigateByUrl(`routines/edit/${id}`);

  }
  eliminar(id: any) {
    console.log(`eliminar producto ${id}`);
    this.routinesService.deleteRoutine(id).subscribe((data) => {
      console.log(data);
      this.loadData();
    });
  }
}
