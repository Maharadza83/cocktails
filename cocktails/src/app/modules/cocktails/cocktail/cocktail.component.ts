import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  NgZone,
  OnInit,
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
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "ngx-lottie/lib/symbols";
@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [
    CocktailFooterComponent,
    CocktailSideComponent,
    IngredientComponent,
    LottieComponent
  ],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly cocktailsService: CocktailsService = inject(CocktailsService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly ngZone: NgZone = inject(NgZone);

  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly cocktail: WritableSignal<Cocktail> = signal(null);

  private animationItem: AnimationItem = null;

  public readonly options: AnimationOptions = {
    path: 'assets/lottie/heart.json',
    loop: false,
    autoplay: false,
    initialSegment: [ 5, 24 ],
  };

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.fetchCocktail();
    })
  }

  public animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  public playLottie(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.play();
    });
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
