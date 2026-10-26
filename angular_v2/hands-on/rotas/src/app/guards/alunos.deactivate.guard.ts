import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AlunoFormComponent } from "app/alunos/aluno-form/aluno-form.component";

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormComponent> {

  canDeactivate(
    component: AlunoFormComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
      // return this.permissions.canDeactivate(this.currentUser, route.params.id);
      console.log("Guarda de Desativação");
      return component.podeMudarRota();
  }
  
}