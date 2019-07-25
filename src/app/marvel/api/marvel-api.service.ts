import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  API_KEY = '2e0f9262dd38510fa30e2c98441cb569';
  ENDPOINT = `characters?apikey=${this.API_KEY}&limit=100`;
  API_URL = `https://gateway.marvel.com/v1/public/${this.ENDPOINT}`;
  HEROES: any;

  constructor(private http: HttpClient) { }


  getHeroes(){
    if(this.HEROES){
      return Promise.resolve(this.HEROES);
    }

    return new Promise(resolve => {
      
      this.http.get(this.API_URL)
        .subscribe(data => {
          this.HEROES = data;
          console.log(this.HEROES);
          resolve(this.HEROES);
        })
    })        
  }

}
