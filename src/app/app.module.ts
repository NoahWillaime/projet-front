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
import {AuthInterceptor} from "./interceptors/AuthInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    AnimalsGridComponent,
    CardComponent,
    HomeComponent,
    SpeciesComponent,
    RefugeComponent,
    LoginComponent
  ],
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
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
