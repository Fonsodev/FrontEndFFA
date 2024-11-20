import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RoutineService } from "../../service/routine.service";
import { Router } from "@angular/router";

@Component(
{
selector:'app-routine',
standalone: true,
imports: [ReactiveFormsModule],
templateUrl: './routines.component.html',
styleUrl: './routines.component.css'
})

export class RoutinesComponent {
  formData: FormGroup = new FormGroup(
  {
    image: new FormControl( '', [Validators.required]),
    name: new FormControl( '', [Validators.required]),
    repetitionsStrength: new FormControl( '', [Validators.required]),
    averageSetsStrength: new FormControl( '', [Validators.required]),
    repetitionsEndurance: new FormControl( '', [Validators.required]),
    averageSetsEndurance: new FormControl( '', [Validators.required]),
    repetitionsHypertrophy: new FormControl('', [Validators.required]),
    averageSetstHypertrophy: new FormControl( '', [Validators.required]),
    description: new FormControl( '', [Validators.required]),
    muscleGroup: new FormControl( '', [Validators.required])
  }
  )
  routines: any[] = [];
  constructor( private routineService: RoutineService, private router: Router){}
  ngOnInit() {
    this.routineService.getAllRoutines().subscribe( (data) => {
      console.log(data);
      this.routines = data.data;
    })
  }
  handleSubmit() {
  if(this.formData.valid){
  console.log(this.formData.value);
  this.routineService.registerRoutines(this.formData.value).subscribe( (data) => {
  console.log(data);
  this.router.navigateByUrl('dashboard/exercises-list');
  });
  this.formData.reset();
  }

  }
}
