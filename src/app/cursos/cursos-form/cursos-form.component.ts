import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  hasError(field: string){
    return this.form.get(field).errors;
  }
  
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) =>{
    //     const id = params['id'];
    //     console.log(id)
    //     const curso$ = this.service.loadByID(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // ); 

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadByID(id)),
    //   //switchMap(cursos => obterAulas)
    // )
    // .subscribe(curso => this.updateForm(curso));

    // convatMap --> ordem da requisição importa
    // mergeMap --> ordem não importa
    // exhaustMao --> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id], 
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  // updateForm(curso){
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }
  
  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid){
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizado curso, tente novamente!'; 
      }
      
      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Curso atualizado com sucesso!');
            this.location.back();
        },
        error => {
          this.modal.showAlertDanger('Erro ao atualizar  curso, tente novamente!')
        }
      )
      /* 
      if (this.form.value.id){
        //update
        this.service.update(this.form.value).subscribe(
          success => { 
            this.modal.showAlertSuccess('Curso atualizado com sucesso!');
            this.location.back();
          },
          error  => this.modal.showAlertDanger('Erro ao atualizar  curso, tente novamente!'),
          () => console.log('update completo')

        )
      }else{
        this.service.create(this.form.value).subscribe(
          success => { 
            this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          },
          error  => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
          () => console.log('request completo')
          )
        }
         */
    }
  }
  
  onCancel(){
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');

  }

}
