import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Gebruiker } from 'src/app/_models/gebruiker.model';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  }, {validator: this.matchPasswordAdd});

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    let username = this.registerForm.value.username;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let user = new Gebruiker(0, email, password, username, "");
    this._userService.addUser(user).subscribe(
      result => {
      }
    );
    this.router.navigate(['/login']);
  }

  matchPasswordAdd(control: AbstractControl){
    let passw = control.get('password').value;
    let passwval = control.get('passwordConfirm').value;
    if (passw != passwval){
      control.get('passwordConfirm').setErrors({MatchPassword: true});
    }else{
      return null;
    }
  }

}
