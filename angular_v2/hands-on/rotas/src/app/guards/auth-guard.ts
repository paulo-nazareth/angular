import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/login/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> | 
     Promise<boolean> | 
     boolean 
  {
    console.log("AuthGuard -> canActivate");
    return this.verificarAcesso();
  }
  
  private verificarAcesso(){
    if(this.authService.autenticado()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;    
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log("AuthGuard -> canLoad, Verificando se o usuário pode carregar o código do módulo.");
    return this.verificarAcesso();
  }

}
