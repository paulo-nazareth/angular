import { HttpClient } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EstadoBr } from '../models/estado-br';

@Injectable()
export class DropdownService {

  constructor(
    // private http: Http (Deprecate)
    private http: HttpClient
  ) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estados_br.json');
                    // .map((res: Response) => res.json());
  }

}
