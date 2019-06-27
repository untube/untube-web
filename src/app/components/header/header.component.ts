import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    location.reload();
    this.router.navigate(['sign-in']);

  }

  isAuthenticated(): boolean {
    let result: boolean;
    this.authService.resolveAfterSeconds().then((response) => {
      result = response;
    })
    return result;
  }
}
