import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;
  private toastrService: ToastrService = inject(ToastrService)

  public login(username: string, password: string): Observable<{ accessToken: string }> {
    return this.httpClient.post<{ accessToken: string }>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      catchError(() => {
        this.toastrService.error('Logowanie nie powiodło się. Sprawdź poprawność danych')
        return of()
      })
    )
  }

  public register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, { username, email, password }).pipe(
      catchError(() => {
        this.toastrService.error('Użytkownik o takim mailu lub nazwie już istnieje')
        return of()
      })
    )
  }

  public getSelf(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/auth/self`)
  }
}
