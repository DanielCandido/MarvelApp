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
  HEROES = [];
  HEROES2 : any;
  OFFSET = 0;
  TOTAL: any;
  DATA: any
  URLS = [];

  constructor(private http: HttpClient) {
    console.log("ApiMarvel");
   }


  getHeroes(){
    if(this.HEROES2){
      return Promise.resolve(this.HEROES2);
    }
  
    return new Promise(resolve => {
      this.http.get(this.API_URL+`&offset=${this.OFFSET}`)
        .subscribe(data => {
          this.HEROES2 = data;
          // console.log(this.HEROES2);
            resolve(this.HEROES2);
       },
       (error => {
         console.log(error);
       }))
    })        
  }

  getData(){
     return new Promise(resolve => {
       this.http.get(this.API_URL)
       .subscribe(dataObj => {
         this.DATA = dataObj;
         for(let i= 0; i < 15; i++){
          //  console.log(this.API_URL+`&offset=${100*i}`);
           this.URLS.push(this.API_URL+`&offset=${100*i}`);
           this.http.get(this.URLS[i])
           .subscribe(heroes => {
             this.HEROES.push(heroes);
           })
         }
         console.log(this.HEROES);
        //  console.log(this.URLS);
         resolve(this.HEROES);
       },
       (error => {
         alert("Erro inesperado Código Erro: "  +error.status + " Erro:" +  error.statusText  );
       }))
     })
  }

}
