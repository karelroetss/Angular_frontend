import { Injectable } from '@angular/core';
import { Gebruiker } from '../_models/gebruiker.model';
import { UserLogin } from '../_models/user-login.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  loggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  addUser(gebruiker: Gebruiker){
    return this.http.post<Gebruiker>(this.baseUrl + "Gebruiker", gebruiker);
  }

  authenticate(userLogin: UserLogin): Observable<Gebruiker>{
    return this.http.post<Gebruiker>(this.baseUrl + "Gebruiker/authenticate", userLogin);
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    localStorage.clear();
  }
}
