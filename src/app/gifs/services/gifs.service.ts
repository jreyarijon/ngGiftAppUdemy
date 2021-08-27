import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'sLimjk8VdMfRHlHlEYi0jSicHezH4q1D';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

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

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('q', query)
          .set('limit', '10');

    console.log(params)
    
    this.http.get<SearchGifsResponse>( `${ this.servicioURL }/search`, { params } )
      .subscribe( (resp)  => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('gifs', JSON.stringify( this.resultados ));
      });
    

  }
}
