import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TemplateFormComponent } from './template-form.component';
import { SharedModule } from 'app/shared/shared.module';
// import { FormDebugComponent } from 'app/shared/form-debug/form-debug.component';
// import { CampoControlErroComponent } from 'app/shared/campo-control-erro/campo-control-erro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // HttpModule, (Deprecate)
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    TemplateFormComponent/*, // Movimentado para o SharedModule
    FormDebugComponent,
    CampoControlErroComponent*/
  ]
})
export class TemplateFormModule { }
