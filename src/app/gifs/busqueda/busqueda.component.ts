import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  constructor(private gifsService: GifsService){}

  // El ! asegura que el valor no va a ser nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    //console.log(this.txtBuscar);
    const valor = this.txtBuscar.nativeElement.value;
    
    if( valor.trim().length === 0){ return; }

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
