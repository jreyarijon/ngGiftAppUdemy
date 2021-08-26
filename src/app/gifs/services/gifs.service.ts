import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  // Permite que los servicios esten definidos en el root. Evitamos tener que expecificarlo en el module.ts
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'sLimjk8VdMfRHlHlEYi0jSicHezH4q1D';
  private _historial: string[] = [];

  // Podemos trabajar con peticiones http con Observables
  constructor( private http: HttpClient) {}

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial= this._historial.splice(0,10);
    }
    
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=sLimjk8VdMfRHlHlEYi0jSicHezH4q1D&q=dragon ball z&limit=10')
      .subscribe( (resp: any) => {
        console.log(resp.data);
      });
    

  }
}
