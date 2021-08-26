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

  buscarGifs(query: string){
    this._historial.unshift( query );
    console.log( this._historial );
  }
}
