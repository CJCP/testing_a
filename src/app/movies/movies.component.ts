import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { fromEvent, merge, of, Observable, Subscription } from 'rxjs';
import { debounceTime, scan, map, startWith, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { MoviesService } from "./services/movies.service";

import { FilterModel, MovieModel } from "../models/models";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {
  @ViewChild('label') label: ElementRef<HTMLElement>;
  @ViewChild('year') year: ElementRef<HTMLElement>;

  $movies: Subscription;
  moviesList: Array<MovieModel> = [];
  DEBOUNCE_TIMER: number = 300;
  movieService: MoviesService;

  constructor(movieService: MoviesService) {
    this.movieService = movieService;
  }

  ngOnInit() {
    this.$movies = this.getStreamFromFilter().pipe(
      switchMap((filter) => {
        return this.movieService.getMovies(filter);
      })
    ).subscribe((movies) => this.moviesList = movies);
  }

  getStreamFromFilter () : Observable<FilterModel> {
    // distinctUntilChanged not working as i want :/
    const x = fromEvent(this.label.nativeElement, 'input').pipe(
      debounceTime(this.DEBOUNCE_TIMER),
      map(
        (e) => {
          return ({
            label: (<HTMLInputElement>e.target).value
          })
        }
      ),
    );

    const y = fromEvent(this.year.nativeElement, 'input').pipe(
      debounceTime(this.DEBOUNCE_TIMER),
      map(
        (e) => {
          return ({
            year: (<HTMLInputElement>e.target).value
          })
        }
      )
    );

    return merge(x, y).pipe(
      scan((acc, curr) => {
        return Object.assign({}, acc, curr);
      }, {}),
      startWith({})
    );
  }


  ngOnDestroy() {
    this.$movies.unsubscribe();
  }
}
