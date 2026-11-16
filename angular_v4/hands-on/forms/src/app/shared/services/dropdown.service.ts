import { Injectable,  } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class DropdownService {

  constructor(private http: Http) { }

  getEstadosBr(){
    return this.http.get('assets/dados/estados_br.json')
                    .map((res: Response) => res.json());
  }

}
