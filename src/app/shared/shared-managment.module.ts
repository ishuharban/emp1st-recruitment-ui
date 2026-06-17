import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SharedRoutingModule } from './shared-managment.route';






@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginComponent,
    SharedRoutingModule,
    
  ],
  exports: [

  ]
})
export class sharedManagmentModule { }
