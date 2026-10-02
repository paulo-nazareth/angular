import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { CursosComponent } from './cursos/cursos.component';
// import { routing } from './app.routing';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursosService } from './cursos/cursos.service';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth-guard';
// import { CursosModule } from './cursos/cursos.module';
// import { AlunosComponent } from './alunos/alunos.component';
// import { AlunosModule } from './alunos/alunos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent/*,
    //Movido para o AlunosModule
    AlunosComponent,
    //Movido para o CursosModule
    CursosComponent, 
    CursoDetalheComponent,
    CursoNaoEncontradoComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // routing
    // CursosModule, --Removido Devido a Lazy Loading
    // AlunosModule, --Removido Devido a Lazy Loading
    AppRoutingModule
  ],
  providers: [ /*CursosService*/
    AuthService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
