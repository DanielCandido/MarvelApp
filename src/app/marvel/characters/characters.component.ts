import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from '../api/marvel-api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public obj: any;
  public heroes: any;

  constructor(private apiMarvel : MarvelApiService) { 
    this.getAllCharacters();
  }

  ngOnInit() {
    
  }

  getAllCharacters(){
    this.apiMarvel.getHeroes()
      .then(data => {
        this.obj = data;
        this.heroes = this.obj.data.results;
        console.log(this.heroes);
      })
  }
}
