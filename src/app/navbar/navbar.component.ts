import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ListService } from '../_services/list.service';
import { Lijst } from '../_models/lijst.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn;

  constructor(
    private _userService: UserService,
    private router: Router
  ) {
    this._userService.loggedIn.subscribe(result => {
      if (result == true) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  ngOnInit() {
    if (localStorage.getItem("isLogged")) {
      this._userService.loggedIn.next(true);
    }
  }

  logOut() {
    this._userService.logOut();
    this._userService.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
