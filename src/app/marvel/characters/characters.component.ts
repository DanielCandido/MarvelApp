import { Component, OnInit, ViewChild } from '@angular/core';
import { MarvelApiService } from '../api/marvel-api.service';
import {MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material';
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
  displayedColumns: string[] = ['image','name','description','stories'];
  dataSource = new MatTableDataSource<any>();
  expandedElement = this.heroes;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('table', {static: true}) myTable: MatTable<Component>;

  constructor(private apiMarvel : MarvelApiService) { 
    this.getAllCharacters();
    // this.getData();
  }

  ngOnInit() {
    
  }

  getAllCharacters(){
    this.apiMarvel.getAllHeroes()
      .then(success => {
        this.heroes = success;
        console.log(this.heroes);
        if(this.heroes){
          setTimeout(() => {this.getData(this.heroes)},5000);
        }
      })
  }

  getData(allHeroes: any){
    this.dataSource = new MatTableDataSource<any>(allHeroes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(name: string) {
    this.dataSource.filter = name.trim().toLowerCase();
  }
}
