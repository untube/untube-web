import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  search: string;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit() { 
      this.router.navigate(['/search',this.search]);  // define your component where you want to go
  }


}
