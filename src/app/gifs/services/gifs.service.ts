import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Gif, SearchGifResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string   =   'W6J4XiohFesl6boBUEgewD9ywtH4tymE';
  private _historial:string[]  =   [];
  private _servicioUrl :string = 'https://api.giphy.com/v1/gifs';
  public resultados:  Gif []   =   [];

  get historial(){
    return [...this._historial];
  }

  constructor(  private http: HttpClient  ){

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

  }

  buscarGif( query:string ){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
    this._historial.unshift( query );
    this._historial = this._historial.splice(0,10);

    localStorage.setItem('historial', JSON.stringify(this._historial) );
   }

   const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query)

    this.http.get<SearchGifResponse>(`${this._servicioUrl}/search`, { params })
          .subscribe( ( resp ) => {
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          });

  }

}
