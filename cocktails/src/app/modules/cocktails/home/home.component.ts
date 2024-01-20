import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CocktailsListComponent} from "../../../shared/cocktails-list/cocktails-list.component";
import {CocktailsService} from "../../../services/cocktails.service";
import {Cocktail} from "../../../models/cocktail";
import {NgClass} from "@angular/common";
import {LoaderComponent} from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CocktailsListComponent,
    NgClass,
    LoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly cocktailsService: CocktailsService = inject(CocktailsService);
  public loading: WritableSignal<boolean> = signal(false);
  public cocktails: WritableSignal<Cocktail[]> = signal([]);
  public chosenLetter: WritableSignal<string> = signal('a');

  public ngOnInit(): void {
    this.fetchList();
  }

  private fetchList(letter: string = 'a'): void {
    this.loading.set(true)
    this.cocktailsService.getCocktailsListByFirstLetter(letter).subscribe((data) => {
      this.cocktails.set(Object.values(data));
      this.loading.set(false)
    })
  }

  public setChosenLetter(letter: string): void {
    this.chosenLetter.set(letter)
    this.fetchList(letter)
  }

  public readonly alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z'];
}
