import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

import { FilterModel, MovieModel } from "../../models/models";

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor() { }

  getMovies(filter: FilterModel): Observable<Array<MovieModel>> {
    var mock = Array(10).fill(0).map((e, i) =>
      ({
        title: `title ${i}`,
        year: `199${i.toString()}`
      }),
    )
    if (filter.label) {
      mock = mock.filter(({title}) => title.includes(filter.label));
    }

    if (filter.year) {
      mock = mock.filter(({year}) => year.includes(filter.year));
    }

    return of<Array<MovieModel>>(
      mock
    );
  }
}
