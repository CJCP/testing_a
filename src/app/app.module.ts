import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppHeaderComponent } from './app-header/app-header.component';
import { MoviesComponent } from './movies/movies.component';

import { MoviesService } from "./movies/services/movies.service";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MoviesComponent
  ],
  imports: [
    /*
    *
    */

    BrowserModule,
    BrowserAnimationsModule,

    /**
     *
     */

    AppRoutingModule,

    /**
     *
     */

    MatInputModule,
    MatToolbarModule,
    MatGridListModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
