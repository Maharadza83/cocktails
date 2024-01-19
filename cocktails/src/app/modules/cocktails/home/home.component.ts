import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CocktailsListComponent} from "../../../shared/cocktails-list/cocktails-list.component";
import {CocktailsService} from "../../../services/cocktails.service";
import {Cocktail} from "../../../models/cocktail";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CocktailsListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly cocktailsService: CocktailsService = inject(CocktailsService);
  public cocktails: WritableSignal<Cocktail[]> = signal([]);

  public ngOnInit(): void {
    this.fetchList();
  }

  private fetchList(): void {
    this.cocktailsService.getCocktailsListByFirstLetter('a').subscribe((data) => {
      this.cocktails.set(Object.values(data));
    })
  }
}
