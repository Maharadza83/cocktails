import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toastrService: ToastrService = inject(ToastrService);

  private readonly _user: WritableSignal<User> = signal(null);
  public readonly user: Signal<User> = computed(() => this._user());

  private readonly _loading: WritableSignal<boolean> = signal(true);
  public readonly loading: Signal<boolean> = computed(() => this._loading());

  public register(username: string, email: string, password: string): void {
    this.authService.register(username, email, password).subscribe(() => {
        this.router.navigate(['/auth/login']).then(() => this.toastrService.success('Zarejestrowano!'))
      }, () => {},
      () => this.stopLoading()
    )
  }

  public login(username: string, password: string): void {
    this.startLoading()
    this.authService.login(username, password).subscribe(({ accessToken }) => {
        this.router.navigate(['/home']).then(() => {
            localStorage.setItem('bearer', accessToken);
            this.getSelf();
          }
        )
      }, () => {},
      () => this.stopLoading()
    )
  }

  public logOut(): void {
    this.router.navigate(['/home']).then(() => {
      this._user.set(null);
      localStorage.removeItem('bearer');
    })
  }

  public getSelf(): void {
    if (this.getToken()) {
      this.startLoading()
      this.authService.getSelf().subscribe((user) => {
        this._user.set(user)
        this.stopLoading();
      })
    }

    this.stopLoading();
  }

  public getToken(): string {
    return localStorage.getItem('bearer')
  }

  private startLoading(): void {
    this._loading.set(true)
  }

  private stopLoading(): void {
    this._loading.set(false)
  }
}
