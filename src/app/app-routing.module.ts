import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './marvel/characters/characters.component';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'Heroes',
    component: CharactersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
