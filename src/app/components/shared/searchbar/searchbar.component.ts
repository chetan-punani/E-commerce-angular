import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  public searchText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    if(this.searchText === '') {
      this.router.navigate([''])
    } else {
      this.router.navigate(['search'], {queryParams: {search: this.searchText}})
    }
  }

}
