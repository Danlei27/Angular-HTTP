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

  create(curso){
    return this.http.post(this.API, curso).pipe(take(1));
  }  
}
