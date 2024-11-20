  import { Component } from '@angular/core';
  import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { RoutineService } from '../../service/routine.service';
  import { ActivatedRoute, Router } from '@angular/router';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-routines-list-edit',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './routines-list-edit.component.html',
    styleUrl: './routines-list-edit.component.css',
  })
  export class RoutinesListEditComponent {
    selectedId!: string;
    formData: FormGroup = new FormGroup({
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      repetitionsStrength: new FormControl('', [Validators.required]),
      averageSetsStrength: new FormControl('', [Validators.required]),
      repetitionsEndurance: new FormControl('', [Validators.required]),
      averageSetsEndurance: new FormControl('', [Validators.required]),
      repetitionsHypertrophy: new FormControl('', [Validators.required]),
      averageSetstHypertrophy: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      muscleGroup: new FormControl('', [Validators.required]),
    });
    routines: any[] = [];
    constructor(
      private routineService: RoutineService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) {}
    ngOnInit() {
      //obtenemos categorias para desplegar en formulario dentro de Select como un option
      this.routineService.getAllRoutines().subscribe((data) => {
        console.log(data);
        this.routines = data.data;
      });
      this.activatedRoute.params.subscribe((data: any) => {
        console.log(data.id);
        this.selectedId = data.id;

        //Usar Id para obtener datos del producto que voy a editar

        this.routineService.getRoutinebyId([data.id]).subscribe((routine) => {
          console.log(routine);

          const { data } = routine;
          const {
            image,
            name,
            repetitionsStrength,
            averageSetsStrength,
            repetitionsEndurance,
            averageSetsEndurance,
            repetitionsHypertrophy,
            averageSetstHypertrophy,
            description,
            muscleGroup,
          } = data;

          this.formData.setValue({
            image,
            name,
            repetitionsStrength,
            averageSetsStrength,
            repetitionsEndurance,
            averageSetsEndurance,
            repetitionsHypertrophy,
            averageSetstHypertrophy,
            description,
            muscleGroup,
          });
        });
      });
      //Obtenemos parametrizacion de ruta usando id pasado a la ruta para obtener datos del producto y mostrarlos en el formulario
    }
    handleSubmit() {
      if (this.formData.valid) {
        this.routineService
          .updateRoutine(this.selectedId, this.formData.value)
          .subscribe((data) => {
            console.log(data);
            this.router.navigateByUrl('dashboard/exercises-list');
          });
      }
      this.formData.reset();
    }
  }
