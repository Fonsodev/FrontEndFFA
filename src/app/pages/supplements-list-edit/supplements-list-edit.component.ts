import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplementsService } from '../../service/supplement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplements-list-edit',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './supplements-list-edit.component.html',
  styleUrl: './supplements-list-edit.component.css'
})
export class SupplementsListEditComponent {
  selectedId!: string;
  formData: FormGroup = new FormGroup({
    urlImage: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

    supplements: any[] = [];
    constructor(
      private supplementsService: SupplementsService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) {}
    ngOnInit() {

      this.activatedRoute.params.subscribe((data:any) =>{
        console.log(data.id);
        this.selectedId = data.id;

        this.supplementsService.getSupplementsbyId(data.id).subscribe((supplements) => {
          console.log(supplements);

          const { data } = supplements;
          const {

              urlImage,
              name,
              description,
              quantity,
              price
            } = data;

            this.formData.setValue({
              urlImage,
              name,
              description,
              quantity,
              price
            });
          });
        })
        }

        handleSubmit() {
          if (this.formData.valid){
            this.supplementsService
              .updateSupplements(this.selectedId, this.formData.value)
              .subscribe((data) =>{
                console.log(data);
                this.router.navigateByUrl('dashboard/supplements-list');
              });
          }
          this.formData.reset();
        }

        }
