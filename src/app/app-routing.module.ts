import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './marvel/characters/characters.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: 'teste',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
