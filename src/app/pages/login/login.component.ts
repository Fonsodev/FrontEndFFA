import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData: FormGroup;
  message: string|boolean|undefined;
  subscription!: Subscription;
  constructor( private authService: AuthService, private router: Router) {
    this.formData = new FormGroup({
      username: new FormControl( '', [Validators.required, Validators.email]),
      password: new FormControl( '', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }
  ngOnDestroy( ): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  handleSubmit() {
    if( this.formData.valid ) {
      console.log(this.formData.value);
      this.subscription = this.authService.loginUser(this.formData.value).subscribe( (data: string|boolean|undefined ) =>{
        console.log( data );

        if ( typeof data === 'string' ) {
          this.message = data;
        } else {
          this.message = 'Ingresando al sistema...';

          setTimeout( () => {
            this.router.navigateByUrl( 'dashboard/exercises-list' );   // Redireccionamos al dashboard
          }, 4000 );
        }

        /** Ocultamos los mensajes que se visualizan en el formulario */
        setTimeout( () => {
          this.message = '';
        }, 2000 );

      });

      this.formData.reset();
    }
  }
}