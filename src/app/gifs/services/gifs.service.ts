import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'sLimjk8VdMfRHlHlEYi0jSicHezH4q1D';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor( private http: HttpClient) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('gifs')! ) || [];
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial= this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=sLimjk8VdMfRHlHlEYi0jSicHezH4q1D&q=${ query }&limit=10`)
      .subscribe( resp  => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('gifs', JSON.stringify( this.resultados ));
      });
    

  }
}
