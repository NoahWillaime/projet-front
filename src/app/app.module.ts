import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalsGridComponent } from './animals-grid/animals-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import { CardComponent } from './shared/card/card.component';
import {MatListModule} from "@angular/material/list";
import { HomeComponent } from './home/home.component';
import { SpeciesComponent } from './species/species.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { RefugeComponent } from './refuge/refuge.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {JwtInterceptor} from "./interceptors/JwtInterceptor";
import {AuthInterceptor} from   "./interceptors/AuthInterceptor";
import { LogoutComponent } from './logout/logout.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { FormComponent } from './shared/form/form.component';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UpdateComponent } from './update/update.component';
import { ProfilComponent } from './profil/profil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AnimalsComponent } from './animals/animals.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsGridComponent,
    CardComponent,
    HomeComponent,
    SpeciesComponent,
    RefugeComponent,
    LoginComponent,
    LogoutComponent,
    DialogComponent,
    FormComponent,
    UpdateComponent,
    ProfilComponent,
    InscriptionComponent,
    AnimalsComponent
  ],
  entryComponents: [ DialogComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
