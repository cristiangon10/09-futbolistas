import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FutbolistasComponent } from './components/futbolistas/futbolistas.component';
import { FutbolistaComponent } from './components/futbolistas/futbolista.component';

//Rutas
import { app_routing } from './app.routes';

//Servicios
import { FutbolistasService } from './services/futbolistas.service';
import { KeysPipe } from './pipes/keys.pipe'

//Paginacion
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    FutbolistasComponent,
    FutbolistaComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [FutbolistasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
