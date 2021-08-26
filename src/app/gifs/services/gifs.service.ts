import { Injectable } from '@angular/core';

@Injectable({
  // Permite que los servicios esten definidos en el root. Evitamos tener que expecificarlo en el module.ts
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial= this._historial.splice(0,10);
    }
    console.log( this._historial );
    
  }
}
