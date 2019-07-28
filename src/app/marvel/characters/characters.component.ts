import { Component, OnInit, ViewChild } from '@angular/core';
import { MarvelApiService } from '../api/marvel-api.service';
import {MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CharactersComponent implements OnInit {
  public obj: any;
  public heroes: any;
  public obj1: any;
  public heroes1 = [];
  displayedColumns: string[] = ['image','name','description','stories'];
  dataSource = new MatTableDataSource(this.heroes);
  expandedElement = this.heroes;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiMarvel : MarvelApiService) { 
    this.getAllCharacters();
    // this.getAllHeroes();
  }

  ngOnInit() {
    
  }

  getAllCharacters(){
    this.apiMarvel.getHeroes()
      .then(data => {
        this.obj = data;
        this.heroes = this.obj.data.results;
        this.dataSource = new MatTableDataSource(this.heroes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.heroes);
      })
  }

  getAllHeroes(){
    this.apiMarvel.getData()
      .then(data => {
        this.obj1 = data;
        // for(let i =0; i < 15; i++){
        //   this.heroes1.push(this.obj.data.results)
        // }
        console.log(this.obj1);
      })
  }

  applyFilter(name: string) {
    this.dataSource.filter = name.trim().toLowerCase();
  }
}
