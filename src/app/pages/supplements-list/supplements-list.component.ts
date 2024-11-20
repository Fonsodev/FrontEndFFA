import { Component } from '@angular/core';
import { SupplementsService } from '../../service/supplement.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-supplements-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./supplements-list.component.html',
  styleUrl: './supplements-list.component.css',
})
export class SupplementsListComponent {
  supplements: any[] = [];
  constructor(private supplementsService: SupplementsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.supplementsService.getAllSupplements().subscribe((supplement) => {
      console.log(supplement);
      this.supplements = supplement.data;
    });
  }

  editar(id: any) {
    console.log(`editar suplemento ${id}`);
    this.router.navigateByUrl(`supplements/edit/${id}`);
  }
  eliminar(id: any) {
    console.log(`eliminar suplemento ${id}`);
    this.supplementsService.deleteSupplements(id).subscribe((data) => {
      console.log(data);
      this.loadData();
    });
  }
}
