import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  API_KEY = '2e0f9262dd38510fa30e2c98441cb569';
  ENDPOINT = `characters?apikey=${this.API_KEY}&limit=100`;
  API_URL = `https://gateway.marvel.com/v1/public/${this.ENDPOINT}`;
  HEROES: any;
  OFFSET = 0;
  URLS = [];
  ALLHEROES= [];
  HEROESALL: any;



  constructor(private http: HttpClient) {
    console.log("ApiMarvel");
  }


  getAllHeroes(){
    return new Promise(resolve => {
    this.http.get(this.API_URL).subscribe(data => {
      for(let i = 0; i < data.data.total/100; i++){
        this.URLS.push(this.API_URL+'&offset='+100*i)
      }
      for(let j = 0; j < this.URLS.length; j++){
        this.http.get(this.URLS[j]).subscribe(
          data => {
            for(let k = 0; k < this.URLS[j].length; k++){
              if(data.data.results[k] !== undefined)
            this.ALLHEROES.push(data.data.results[k]);
            }
          }
        )
      }
      
      console.log(this.ALLHEROES);
      this.HEROESALL = this.ALLHEROES;
      resolve(this.HEROESALL);
    })
  })
    // console.log(this.URLS);
    // const req = this.http.get(this.API_URL);
    // const req1 = this.http.get(this.API_URL+`&offset=100`);
  }

  getHeroes() {
    if (this.HEROES) {
      return Promise.resolve(this.HEROES);
    }

    return new Promise(resolve => {
      this.http.get(this.API_URL + `&offset=${this.OFFSET}`)
        .subscribe(success => {
          this.HEROES = success.data.results;
          // console.log(this.HEROES2);
          resolve(this.HEROES);
        },
          (error => {
            console.log(error);
          }))
    })
  }
}
