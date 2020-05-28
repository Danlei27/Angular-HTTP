import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full',  redirectTo: 'upload'
  },
  {
    path: 'cursos',
    loadChildren: () => 
    import('./cursos/cursos.module').then(mod => mod.CursosModule)    
  },
  {
    path: 'upload',
    loadChildren: () => 
    import('./upload-file/upload-file.module').then(mod => mod.UploadFileModule)    
  },

  {
    path: 'rxjs-poc',
    loadChildren: () => 
    import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(mod => mod.UnsubscribeRxjsModule)    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
