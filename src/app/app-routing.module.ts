import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full',  redirectTo: 'busca-reativa'
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
    path: 'busca-reativa',
    loadChildren: () => 
    import('./reactive-search/reactive-search.module').then(mod => mod.ReactiveSearchModule)    
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
