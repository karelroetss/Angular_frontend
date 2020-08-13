import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let userLogin = new UserLogin(email, password);
    this._userService.authenticate(userLogin).subscribe(
      data => {
        localStorage.setItem("userID", data.gebruikerID.toString());
        localStorage.setItem("email", data.email.toString());
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLogged", "true");
        this._userService.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      }
    )
    
  }
}
