import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "/countplaces/"
  userId: number;
  response;
  videos: any[]
  private users  = [{id: 1},{id: 2},{id: 3},{id:4},{id:5}]; 

  ngOnInit() {
  }


getCount(){
  var postData = {
    idUser: this.userId
  }
  this.httpClient.post(this.baseUrl,postData).toPromise().then((data: any) =>{
      console.log(data)
      this.response = JSON.stringify(data.json);
  });  

}

}
