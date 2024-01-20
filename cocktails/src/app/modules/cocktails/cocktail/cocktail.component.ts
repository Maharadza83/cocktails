import {
  ChangeDetectionStrategy,
  Component, computed,
  DestroyRef,
  inject,
  OnInit, Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {CocktailFooterComponent} from "./components/cocktail-footer/cocktail-footer.component";
import {CocktailSideComponent} from "./components/cocktail-side/cocktail-side.component";
import {ActivatedRoute} from "@angular/router";
import {CocktailsService} from "../../../services/cocktails.service";
import {Cocktail} from "../../../models/cocktail";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IngredientComponent} from "./components/ingredient/ingredient.component";
import {UserStore} from "../../../store/user.store";
import {HeartBtnComponent} from "./components/heart-btn/heart-btn.component";

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [
    CocktailFooterComponent,
    CocktailSideComponent,
    IngredientComponent,
    HeartBtnComponent
  ],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly cocktailsService: CocktailsService = inject(CocktailsService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly userStore: UserStore = inject(UserStore);

  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly cocktail: WritableSignal<Cocktail> = signal(null);

  public isLoggedIn: Signal<boolean> = computed(() => !!this.userStore.user())

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.fetchCocktail();
    })
  }

  private fetchCocktail(): void {
    this.loading.set(true)

    const id = this.activatedRoute.snapshot.params['id'];
    this.cocktailsService.getCocktail(id).subscribe((data) => {
      this.cocktail.set(data)
      this.loading.set(false)
    })
  }
}
