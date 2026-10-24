import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AlunosGuard implements CanActivateChild {

  canActivateChild(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): 
    Observable<boolean> | 
    Promise<boolean> | 
    boolean {
      if(state.url.includes('editar')){
        alert("Usuário sem permissão de edição.");
        // return false;
        return Observable.of(false);
      }
      console.log('Guard Rota Filha Alunos');
      return true;
  }

}