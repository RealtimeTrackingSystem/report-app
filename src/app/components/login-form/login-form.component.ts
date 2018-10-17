import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() loginAction = new EventEmitter<any>();
  @Output() errorAction = new EventEmitter<any>();

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginName: [ null, Validators.required ],
      password: [ null, Validators.required ]
    });
  }

  login () {
    if (this.loginForm.valid) {
      this.loginAction.emit({
        loginName: this.loginForm.value.loginName,
        password: this.loginForm.value.password
      });
    } else {
      this.errorAction.emit({message: 'Please Accomplish the form with correct information'});
    }
  }

}
