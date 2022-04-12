import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {


  get resultados(){
    return this.gifsServices.resultados;
  }

  constructor( private gifsServices  : GifsService ) { }




}
