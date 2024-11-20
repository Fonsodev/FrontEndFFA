import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MealsService } from "../../service/meals.service";

@Component({
  selector: 'app-meals-list-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './meals-list-edit.component.html',
  styleUrl: './meals-list-edit.component.css'
})

export class MealsListEditComponent {
  selectedId!:string;
  formData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    ingredients: new FormControl('', [Validators.required]),
    instructions: new FormControl('', [Validators.required]),
    calories: new FormControl('', [Validators.required]),
    proteins: new FormControl('', [Validators.required]),
    fats: new FormControl('', [Validators.required]),
    carbohydrates: new FormControl('', [Validators.required]),
    fiber: new FormControl('', [Validators.required]),
  });

  meals: any [] = [];
  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(){
    this.mealsService.getAllMeals().subscribe((data)=> {
      console.log(data);
      this.meals = data.data;
    });
    this.activatedRoute.params.subscribe((data:any) => {
      console.log(data.id);
      this.selectedId = data.id;

      this.mealsService.getMealsbyId([data.id]).subscribe((meals) => {
        console.log(meals);

        const { data } = meals;
        const {

          name,
          image,
          ingredients,
          instructions,
          calories,
          proteins,
          fats,
          carbohydrates,
          fiber

         } = data;

         this.formData.setValue({
          name,
          image,
          ingredients,
          instructions,
          calories,
          proteins,
          fats,
          carbohydrates,
          fiber
         });

      });
    })
  }

  handleSubmit() {
    if (this.formData.valid){
      this.mealsService
      .updateMeals(this.selectedId, this.formData.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('dashboard/meals-list');
      });
    }
    this.formData.reset();
  }

}
