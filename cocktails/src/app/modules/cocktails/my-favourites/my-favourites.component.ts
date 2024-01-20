import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {MyFavouritesService} from "../../../services/my-favourites.service";
import {CocktailsListComponent} from "../../../shared/cocktails-list/cocktails-list.component";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {Cocktail} from "../../../models/cocktail";
import {UserStore} from "../../../store/user.store";

@Component({
  selector: 'app-my-favourites',
  standalone: true,
  imports: [
    CocktailsListComponent,
    LoaderComponent
  ],
  templateUrl: './my-favourites.component.html',
  styleUrl: './my-favourites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFavouritesComponent implements OnInit {
  private readonly myFavouritesService: MyFavouritesService  = inject(MyFavouritesService);
  private readonly userStore: UserStore  = inject(UserStore);
  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly cocktails: WritableSignal<Cocktail[]> = signal([]);
  public readonly username: Signal<string> = computed(() => this.userStore.user().username)

  public ngOnInit(): void {
    this.fetchList()
  }

  private fetchList(): void {
    this.loading.set(true)
    this.myFavouritesService.getMyFavourites().subscribe((data) => {
      this.cocktails.set(data)
      this.loading.set(false)
    })
  }
}
