import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MealsService } from '../../service/meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css',
})
export class MealsComponent {
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
  meals: any[] = [];
  constructor(private mealsService: MealsService, private router: Router) {}
  ngOnInt() {
    this.mealsService.getAllMeals().subscribe((data) => {
      console.log(data);
      this.meals = data.data;
    });
  }

  handleSubmit() {
    if (this.formData.valid) {
      console.log(this.formData.value);
      this.mealsService.registerMeals(this.formData.value).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('dashboard/meals-list');
      });
      this.formData.reset();
    }
  }
}
