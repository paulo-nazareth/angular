import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { EstadoBr } from '../models/estado-br';
// import { map } from 'rxjs/operators';

@Injectable()
export class DropdownService {

  constructor(
    // private http: Http (Deprecate)
    private http: HttpClient
  ) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estados_br.json')
                    .pipe(
                      shareReplay(1)
                    );
                    // .pipe(map((res: Response) => res.json()));
  }

}
