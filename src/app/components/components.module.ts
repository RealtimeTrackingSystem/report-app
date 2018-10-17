import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { RootLoaderComponent } from './root-loader/root-loader.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    LoginFormComponent,
    SignupFormComponent
  ],
  exports: [
    LoginFormComponent,
    SignupFormComponent
  ]
})
export class ComponentsModule { }
