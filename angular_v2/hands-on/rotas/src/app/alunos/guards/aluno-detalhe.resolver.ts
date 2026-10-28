import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { AlunoDetalheComponent } from "../aluno-detalhe/aluno-detalhe.component";
import { Aluno } from "../aluno";
import { AlunosService } from "../alunos.service";

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno> {

    constructor(
        private alunosService: AlunosService
    ){}

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        console.log("Detalhe Resolver");

        let id = route.params['id'];
        return this.alunosService.getAluno(id);
    }

}