import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CocktailCardComponent} from "../cocktail-card/cocktail-card.component";
import {Cocktail} from "../../models/cocktail";

@Component({
  selector: 'app-cocktails-list',
  standalone: true,
  imports: [
    CocktailCardComponent
  ],
  templateUrl: './cocktails-list.component.html',
  styleUrl: './cocktails-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailsListComponent {
  @Input() public cocktails: Cocktail[];
}
