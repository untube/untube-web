import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Video,Query, VIDEOS_BY_NAME } from '../shared/video';
import {map} from 'rxjs/operators';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {

  searchName: string;
  videos$:  Observable<Video[]>;

  constructor(private route: ActivatedRoute, private apollo: Apollo,private router: Router) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    let name = params.get('name');
    this.searchName = name;
    console.log(this.searchName)
    this.videos$ = this.apollo.watchQuery<Query>({ query: VIDEOS_BY_NAME,variables: {name: this.searchName}
    }).valueChanges.pipe(map(result => result.data.videosByName));

    console.log(this.videos$)


    });

  }

  
  onSelect(video){

    this.router.navigate(['/watch',video.id]);

  }

}
