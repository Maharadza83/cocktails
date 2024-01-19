import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { cocktailMap } from '../utils/cocktail.map';
import { Cocktail } from '../models/cocktail';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public getRandomCocktail(): Observable<Cocktail> {
    return this.httpClient.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .pipe(
        map(item => item.drinks[0]),
        cocktailMap(),
        catchError(() => {
          return of(null);
        }),
      );
  };

  public getCocktail(cocktailId: string): Observable<Cocktail> {
    return this.httpClient.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
      .pipe(
        map(item => item.drinks[0]),
        cocktailMap(),
        catchError(() => {
          return of(null);
        }),
      );
  };

  public getCocktailsListByFirstLetter(letter: string): Observable<Cocktail[]> {
    return this.httpClient.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .pipe(
        map(item => item.drinks),
        cocktailMap(),
        catchError(() => {
          return of(null);
        }),
      );
  }
}
