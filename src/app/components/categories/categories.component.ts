import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query, Category, ALL_CATEGORIES } from '../../models/category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  categories$: Observable<Category[]>
  

  constructor(private router: Router, private apollo: Apollo) { }
 
  ngOnInit() {
    this.categories$ = this.apollo.watchQuery<Query>({ query: ALL_CATEGORIES}).valueChanges.pipe(map(result => result.data.allCategories));
  }

  onSelect(category){

    this.router.navigate(['/categories',category.id]);

  }

}



