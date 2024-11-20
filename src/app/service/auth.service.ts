import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, map } from 'rxjs';
import { User } from '../interfaces/user';
import { Response } from '../interfaces/response';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUserData : User | null = null;

  constructor( private http: HttpClient, private router: Router) { }

  get userData(): User | null {
    const storedData = localStorage.getItem('authUserData') || null;

    // Verifica si storedData no es null ni undefined, además si el contenido es válido JSON
    this._authUserData = storedData ? JSON.parse( storedData ) : null;
    return this._authUserData;
  }

  //credenciales { User }
  registerUser ( newUser: User ) : Observable<string|undefined>{
    return this.http.post<Response>( 'http://localhost:3000/api/auth/register', newUser )
      .pipe(
        map( ( data ) => {
          if(!data.ok){
            return data.msg;
          }
          return 'Se registro existosamente'
        }
        ),
        catchError( (error) => {
          return of ('Error en el servidor')
        })
      );
  }
  //credenciales { username, password}
  loginUser( user: User ) : Observable<string|boolean|undefined> {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', user )
      .pipe(
        tap( ( data ) => {
          if( data.token ){

            if( data.data){
              console.log('Datos del usuario a guardar:', data.data)                // Paso 1: Guardar el token en el localstorage
              this._authUserData = data.data;                                       // Paso 2: Obtener los datos del usuario ( nombre, correo, roles)
              localStorage.setItem( 'authUserData', JSON.stringify(data.data) );    // Paso 3: Guardar datos del usuario en el localstorage

            }

            localStorage.setItem( 'token', data.token );
          }
        }),
        map( (data) => {
          if(!data.ok){
            return data.msg;
          }
          return data.ok;
        }  ),
        catchError( (error) => {
          console.error('error')
          return of ('Error en el servidor')
        })

      );
  }

  logoutUser(): Observable<boolean> {
      this._authUserData = null;                  // Elimina datos del usuario autenticado en el Servicio
      localStorage.removeItem( 'token' );         // Elimina token del LocalStorage
      localStorage.removeItem( 'authUserData' );  // Elimina datos del usuario autenticado en el LocalStorage

    return of( true );
  }

//TODO: Verificar cuando se vence el token para que el guard limpie el localstorage y redireccione al login.

  verifyAuthUser() : Observable <boolean> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('X-Token', token);
    return this.http.get<Response>('http://localhost:3000/api/auth/re-new-token', {headers})
    .pipe(
      tap( (data) => {
        console.log(data)
        if(data.token){
          localStorage.setItem('token', data.token)
        }
        else{
          localStorage.removeItem('token')
        }
      }),
      map ( (data) => {
        return data.ok
      } ),
      catchError( (error) => {
        return of (false)
      } )
    );
  }
  // getUser () {
  //   return this.http.get( 'http://localhost:3000/api/auth/')
  // }
  // getUserId ( userId: User) {
  //   return this.http.get<User>( 'http://localhost:3000/api/auth/{$userId}');
  // }
  // updateUser ( updateUser: User) {
  //   return this.http.patch( 'http://localhost:3000/api/auth/{$userId}', updateUser)
  // }
  // deleteUser ( deleteUser: User) {
  //   return this.http.delete( `http://localhost:3000/api/auth/{$userId}` )
  // }
}
