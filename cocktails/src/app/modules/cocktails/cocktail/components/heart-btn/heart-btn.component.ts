import {ChangeDetectionStrategy, Component, inject, Input, NgZone, OnInit, signal, WritableSignal} from '@angular/core';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "ngx-lottie/lib/symbols";
import {MyFavouritesService} from "../../../../../services/my-favourites.service";
import {Cocktail} from "../../../../../models/cocktail";
import {NgTemplateOutlet} from "@angular/common";
import {LoaderComponent} from "../../../../../shared/loader/loader.component";

@Component({
  selector: 'app-heart-btn',
  standalone: true,
  imports: [
    LottieComponent,
    NgTemplateOutlet,
    LoaderComponent
  ],
  templateUrl: './heart-btn.component.html',
  styleUrl: './heart-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeartBtnComponent implements OnInit {
  @Input() public cocktail: Cocktail

  private readonly myFavouritesService: MyFavouritesService = inject(MyFavouritesService);
  private readonly ngZone: NgZone = inject(NgZone);

  public isFav: WritableSignal<boolean> = signal(false);
  public loading: WritableSignal<boolean> = signal(false)

  public readonly optionsAdd: AnimationOptions = {
    path: 'assets/lottie/heart.json',
    loop: false,
    autoplay: false,
    initialSegment: [ 24, 5 ],
  };

  public readonly optionsRemove: AnimationOptions = {
    path: 'assets/lottie/heart.json',
    loop: false,
    autoplay: false,
    initialSegment: [ 5, 24 ],
  };

  private animationItem: AnimationItem = null;

  public ngOnInit(): void {
    this.loading.set(true)
    this.myFavouritesService.checkIfIsFav(this.cocktail.idDrink).subscribe(({ isFav }) => {
      this.isFav.set(isFav);
      this.loading.set(false)
    })
  }

  public animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  public addToFav(): void {
    this.loading.set(true)
    this.myFavouritesService.addToFav(this.cocktail).subscribe(() => {
      this.ngZone.runOutsideAngular(() => {
        this.animationItem.play();
      });
        this.loading.set(false)
        this.isFav.set(true)
    })
  }

  public removeFromFav(): void {
    this.loading.set(true)
    this.myFavouritesService.removeFromFav(this.cocktail.idDrink).subscribe(() => {
      this.ngZone.runOutsideAngular(() => {
        this.animationItem.play();
      });
        this.loading.set(false)
        this.isFav.set(false)
    })
  }

}
