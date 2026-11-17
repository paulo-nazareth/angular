import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';
// import { map } from 'rxjs/operators';

@Injectable()
export class DropdownService {

  constructor(
    // private http: Http (Deprecate)
    private http: HttpClient
  ) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estados_br.json');
                    // .pipe(map((res: Response) => res.json()));
  }

}
