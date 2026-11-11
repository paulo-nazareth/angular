import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataFormComponent } from './data-form.component';
import { FormDebugComponent } from 'app/shared/form-debug/form-debug.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    DataFormComponent
  ]
})
export class DataFormModule { }
