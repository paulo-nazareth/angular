import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MeuPrimeiroComponent } from './primeiro-componente-manual/meu-primeiro.component';
import { PrimeiroComponenteComponent } from './primeiro-componente/primeiro-componente.component';

@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent,
    PrimeiroComponenteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
