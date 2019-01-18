import { Component, OnInit, OnChanges } from '@angular/core';
import { Futbolista } from "../../interfaces/futbolista.interface";
import { Router, ActivatedRoute } from '@angular/router';
import { FutbolistasService } from '../../services/futbolistas.service';
import { NgForm } from '@angular/forms';

//Sweet Alert
import swal from 'sweetalert2';

@Component({
  selector: 'app-futbolista',
  templateUrl: './futbolista.component.html',
  styles: []
})
export class FutbolistaComponent implements OnInit {

  futbolista: Futbolista = {
    Club: '',
    Dorsal: 0,
    Edad: 0,
    Estado: '',
    Nombre: '',
    Posicion: '',
    Seleccion: ''
  };

  nuevo: boolean = false;
  id: string;
  estado: string = "success";
  isNuevo: boolean = false;




  constructor(
    private _futbolistasService: FutbolistasService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    this.ocultarBoton();

    this.routes.params.subscribe(parametros => {
      this.id = parametros['id']

      if (this.id !== "nuevo") {
        this.isNuevo = false;
        this._futbolistasService.getFutbolista(this.id)
          .subscribe(data => {
            console.log(data);

            this.futbolista = data;
          })
      }else{
        this.isNuevo = true;
      }
    });
  }

  ocultarBoton() {
    if (this.router.url == '/futbolista/nuevo') {
      this.isNuevo = true;
    }

  }

  ngOnInit() {
    console.log("Entro a onInit");

  }

  ngOnChanges() {
    console.log("Entro a ngOnChanges");
  }


  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/futbolista', 'nuevo'], {});
    //document.getElementById("btnNnevo").remove();
    forma.reset();
  }

  guardar() {

    if (this.id == "nuevo") {
      //Insertando
      console.log(this.futbolista);
      this._futbolistasService.nuevoFutbolista(this.futbolista)
        .subscribe(
          data => {
            const toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            
            toast({
              type: 'success',
              title: 'Registro creado correctamente'
            })
            this.router.navigate(['/futbolista', data.name]);
          }, error =>
            console.error(error)
        );
    } else {
      //Actualizando
      console.log(this.futbolista);
      this._futbolistasService.actualizarFutbolista(this.futbolista, this.id)
        .subscribe(
          data => {
            const toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            
            toast({
              type: 'success',
              title: 'Actualizado Correctamente'
            })
            console.log(data);
          }, error =>
            console.error(error)
        );
    }

  }
}
