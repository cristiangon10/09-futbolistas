import { Component, OnInit } from '@angular/core';
import { FutbolistasService } from '../../services/futbolistas.service';

//Sweet Alert
import swal from 'sweetalert2';

@Component({
  selector: 'app-futbolistas',
  templateUrl: './futbolistas.component.html',
  styles: []
})
export class FutbolistasComponent implements OnInit {

  futbolistas: any;
  loading: boolean = true;
  p:number = 1;


  constructor(private _futbolistasService: FutbolistasService) {
    this._futbolistasService.getFutbolistas()
      .subscribe(data => {
        this.futbolistas = data;
        this.loading = false;
        // setTimeout( ()=> this.loading = false, 2000);
      }
      )
  }



  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons({
      title: 'Realmente desea eliminar?',
      text: "Este texto se eliminará de forma permanente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: ' Yes, Eliminalo ya! ',
      cancelButtonText: ' No, cancelalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._futbolistasService.borrarFutbolista(key$)
        .subscribe(data => 
          {
            if (data) {
              console.error(data);
            }
            else {
              delete this.futbolistas[key$];
              console.log("Se elimino");
            }
          }
        )
        swalWithBootstrapButtons(
          'Elimiando!',
          'El registro fue eliminado exitosamente',
          'success'
        )
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons(
          'Cancelado',
          'El registro se encuentra de manera segura',
          'error'
        )
      }
    })
  }
}
