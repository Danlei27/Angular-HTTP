import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  hasError(field: string){
    return this.form.get(field).errors;
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid){
      console.log('submit');
    }
  }
  
  onCancel(){
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');

  }

}
