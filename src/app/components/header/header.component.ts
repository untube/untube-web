import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  isAuthenticated(): boolean {
    let result: boolean;
    this.authService.isAuthenticated().then((response) => {
      result = response;
    })
    return result;
  }
}
