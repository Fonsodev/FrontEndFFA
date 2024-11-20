import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Routine } from '../interfaces/routine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private token!: string;
  private headers!: HttpHeaders;
  constructor(private request: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('X-token', this.token);
  }

  getAllRoutines() {
    return this.request.get<any>('http://localhost:3000/api/routines');
  }
  registerRoutines(newRoutines: Routine) {
    return this.request.post<any>(
      'http://localhost:3000/api/routines',
      newRoutines,
      { headers: this.headers }
    );
  }

  deleteRoutine(id: any) {
    return this.request.delete(`http://localhost:3000/api/routines/${id}`, {
      headers: this.headers,
    });
  }

  getRoutinebyId(id: any) {
    return this.request.get<any>(`http://localhost:3000/api/routines/${id}`);
  }

  updateRoutine(id: any, updatedRoutine: any) {
    return this.request.patch <any>(
      `http://localhost:3000/api/routines/${id}`,
      updatedRoutine,
      { headers: this.headers }
    );
  }
}
