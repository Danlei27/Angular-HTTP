import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './cursos-lista/cursos';
import { environment } from '../../environments/environment';
import { delay, take } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;
  
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000)
    )
  }

  loadByID(id){
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }
  
  private create(curso){
    return this.http.post(this.API, curso).pipe(take(1));
  }  

  private update(curso){
    return this.http.put(`${this.API}/${curso.id}`,curso).pipe(take(1));
  }

  save(curso){
    if (curso.id){
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
