import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Video, VIDEO_BY_ID} from '../shared/video'
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {Query, VIDEO_BY_CATEGORY, Category} from '../shared/category'
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-categoryvideolist',
  templateUrl: './categoryvideolist.component.html',
  styleUrls: ['./categoryvideolist.component.css']
})

export class CategoryvideolistComponent implements OnInit {

  categoryId;
  cateogory: Category;
  videos$: Observable<Video[]>

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) { }

  ngOnInit() {
        
      this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.categoryId = id;

      });

      this.videos$ = this.apollo.watchQuery<Query>({
          query: VIDEO_BY_CATEGORY, variables: {id: this.categoryId}
      }).valueChanges.pipe(map(result => result.data.videosByCategoryId));
  }

  onSelect(video){

    this.router.navigate(['/watch',video.id]);

  }
}
