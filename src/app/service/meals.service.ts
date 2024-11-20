import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meals } from '../interfaces/meals';


@Injectable({
providedIn: 'root'
})
export class MealsService {
  private token!: string
  private headers!: HttpHeaders
  constructor( private request: HttpClient) {
   
    this.token = localStorage.getItem( 'token' ) || '';
    this.headers = new HttpHeaders().set('X-Token', this.token);
  }

  getAllMeals () {
    return this.request.get<any>('http://localhost:3000/api/recipes')
  }

  registerMeals ( newMeals: Meals ){
  return this.request.post( 'http://localhost:3000/api/recipes', 
    newMeals, {headers: this.headers} );
  }

  deleteMeals ( id:any ) {
    return this.request.delete(`http://localhost:3000/api/recipes/${id}`,
    {headers: this.headers});
  }
  getMealsbyId(id: any) {
    return this.request.get<any>(`http://localhost:3000/api/recipes/${id}`);
  }

  updateMeals(id: any, updateMeals: any) {
    return this.request.patch <any>(
      `http://localhost:3000/api/recipes/${id}`,
      updateMeals,
      { headers: this.headers }
    );
  }
}
