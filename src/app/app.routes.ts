import { RouterModule, Routes } from '@angular/router';
import { FutbolistasComponent } from './components/futbolistas/futbolistas.component';
import { FutbolistaComponent } from './components/futbolistas/futbolista.component';

const app_routes: Routes = [
    { path: 'futbolistas', component: FutbolistasComponent },
    { path: 'futbolista/:id', component: FutbolistaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'futbolistas'}
];

export const app_routing = RouterModule.forRoot(app_routes);