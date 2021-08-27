import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  // Permite que los servicios esten definidos en el root. Evitamos tener que expecificarlo en el module.ts
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'sLimjk8VdMfRHlHlEYi0jSicHezH4q1D';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  // Podemos trabajar con peticiones http con Observables
  constructor( private http: HttpClient) {
    /*  PRIMERA FORMA
    if( localStorage.getItem('historial') ) {
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }
    */
    
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial= this._historial.splice(0,10);

      // Almacenar de manera local para que no se pierda al cerrar sesion en el navegador
      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=sLimjk8VdMfRHlHlEYi0jSicHezH4q1D&q=${ query }&limit=10`)
      .subscribe( resp  => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
    

  }
}
