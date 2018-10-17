import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  @Output() signupAction = new EventEmitter<any>();
  @Output() errorAction = new EventEmitter<any>();

  public signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      gender: ['M', Validators.required],
      alias: [null, Validators.required],
      street: [null, Validators.required],
      barangay: [null, Validators.required],
      city: [null, Validators.required],
      region: [null, Validators.required],
      country: [null, Validators.required],
      zip: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required]
    });
  }

  signup () {
    if (this.signupForm.valid) {
      this.signupAction.emit(this.signupForm.value);
    } else {
      this.errorAction.emit({message: 'Please Accomplish the form with correct information'});
    }
  }

}
