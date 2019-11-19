import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SpeciesComponent} from "./species/species.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGuard} from "./AuthGuard";
import {RefugeComponent} from './refuge/refuge.component';
import {UpdateComponent} from "./update/update.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {ProfilComponent} from "./profil/profil.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'species/:species', component: SpeciesComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'refuge', component: RefugeComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'inscription', component: InscriptionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
