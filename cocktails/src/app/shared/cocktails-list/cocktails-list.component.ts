import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Cocktail} from "../../models/cocktail";
import {CocktailCardComponent} from "../cocktail-card/cocktail-card.component";

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
