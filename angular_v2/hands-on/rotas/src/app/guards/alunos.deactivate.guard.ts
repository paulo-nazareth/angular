import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AlunoFormComponent } from "app/alunos/aluno-form/aluno-form.component";
import { IFormCandeactivate } from "./form.candeactivate";

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCandeactivate> /*CanDeactivate<AlunoFormComponent>*/ {

  canDeactivate(
    component: IFormCandeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
      // return this.permissions.canDeactivate(this.currentUser, route.params.id);
      console.log("Guarda de Desativação");
      //return component.podeMudarRota();
      return component.podeDesativar();
  }
  
}