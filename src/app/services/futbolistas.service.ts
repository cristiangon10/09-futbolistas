import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Futbolista } from '../interfaces/futbolista.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FutbolistasService {

  futbolistasURL: string = "https://futbolistasapp.firebaseio.com/futbolistas.json";
  futbolistaURL: string = "https://futbolistasapp.firebaseio.com/futbolistas/";

  constructor(private http: Http) { }

  nuevoFutbolista(futbolista: Futbolista) {
    let body = JSON.stringify(futbolista);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });



    return this.http.post(this.futbolistasURL, body, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      })
      )
  }

  actualizarFutbolista(futbolista: Futbolista, key$: string) {
    let body = JSON.stringify(futbolista);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.futbolistaURL}/${key$}.json`;

    return this.http.put(url, body, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      })
      )
  }

  getFutbolista(key$: string) {
    let url = `${this.futbolistaURL}/${key$}.json`;
    console.log(url);
    
    return this.http.get(url).pipe(map(res => res.json()));
  }

  getFutbolistas() {
    return this.http.get(this.futbolistasURL).pipe(map( res=>res.json() ));

  }

  borrarFutbolista( key$:string)
  {
    let url = `${this.futbolistaURL}/${ key$}.json`;
    return this.http.delete(url).pipe(map( res => res.json())
    );}
}
