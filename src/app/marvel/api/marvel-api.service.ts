import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  API_KEY = '2e0f9262dd38510fa30e2c98441cb569';
  ENDPOINT = `characters?apikey=${this.API_KEY}&limit=100`;
  API_URL = `https://gateway.marvel.com/v1/public/${this.ENDPOINT}`;
  HEROES: any;
  OFFSET = 0;



  constructor(private http: HttpClient) {
    console.log("ApiMarvel");
  }


  getHeroes() {
    if (this.HEROES) {
      return Promise.resolve(this.HEROES);
    }

    return new Promise(resolve => {
      this.http.get(this.API_URL + `&offset=${this.OFFSET}`)
        .subscribe(data => {
          this.HEROES = data.data.results;
          // console.log(this.HEROES2);
          resolve(this.HEROES);
        },
          (error => {
            console.log(error);
          }))
    })
  }
}
