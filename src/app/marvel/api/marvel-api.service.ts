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
  OFFSET = 0;
  DATA: any;

  constructor(private http: HttpClient) {
    console.log("ApiMarvel");
   }


  getHeroes(){
    if(this.HEROES){
      return Promise.resolve(this.HEROES);
    }

    return new Promise(resolve => {
      this.http.get(this.API_URL+`&offset=${this.OFFSET}`)
        .subscribe(data => {
          this.DATA = data;
          console.log(this.DATA);
          let total = this.DATA.data.total;
          // while(total < total){
          //   total = -100;
          //   this.OFFSET = +100;
          //   console.log(total);
          //   this.http.get(this.API_URL+`&offset=${this.OFFSET}`).subscribe(data => {
          //     this.HEROES = data;
          //     console.log(this.HEROES);
          //   })
          // }
          resolve(this.DATA);
        })
    })        
  }

}
