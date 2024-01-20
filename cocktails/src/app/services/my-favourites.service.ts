import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {Cocktail} from "../models/cocktail";

@Injectable({
  providedIn: 'root',
})
export class MyFavouritesService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  public getMyFavourites(): Observable<Cocktail[]> {
    return this.httpClient.get<Cocktail[]>(`${this.apiUrl}/bartenders/fav`).pipe(
      catchError(() => {
        return of([])
      })
    )
  }

  public addToFav(cocktail: Cocktail): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/userFavouritesReceipes`, cocktail)
  }

  public removeFromFav(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/userFavouritesReceipes/${id}`)
  }

  public checkIfIsFav(id: string): Observable<{ isFav: boolean }> {
    return this.httpClient.get<{ isFav: boolean }>(`${this.apiUrl}/userFavouritesReceipes/${id}`).pipe(
      catchError(() => {
        return of({ isFav: false })
      })
    )
  }
}
