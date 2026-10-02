import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/login/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
    Observable<boolean> | 
    Promise<boolean> | 
    boolean {
    if(this.authService.autenticado()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
