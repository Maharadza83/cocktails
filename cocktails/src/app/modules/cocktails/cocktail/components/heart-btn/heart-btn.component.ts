import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {} from "ngx-lottie";
import {MyFavouritesService} from "../../../../../services/my-favourites.service";
import {Cocktail} from "../../../../../models/cocktail";
import {NgTemplateOutlet} from "@angular/common";
import {LoaderComponent} from "../../../../../shared/loader/loader.component";

@Component({
  selector: 'app-heart-btn',
  standalone: true,
  imports: [
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

  public isFav: WritableSignal<boolean> = signal(false);
  public loading: WritableSignal<boolean> = signal(false)

  public ngOnInit(): void {
    this.loading.set(true)
    this.myFavouritesService.checkIfIsFav(this.cocktail.idDrink).subscribe(({ isFav }) => {
      this.isFav.set(isFav);
      this.loading.set(false)
    })
  }

  public addToFav(): void {
    this.loading.set(true)
    this.myFavouritesService.addToFav(this.cocktail).subscribe(() => {
        this.loading.set(false)
        this.isFav.set(true)
    })
  }

  public removeFromFav(): void {
    this.loading.set(true)
    this.myFavouritesService.removeFromFav(this.cocktail.idDrink).subscribe(() => {
        this.loading.set(false)
        this.isFav.set(false)
    })
  }

}
