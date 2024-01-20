import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Cocktail} from "../../models/cocktail";
import {LinkPipe} from "../../pipes/link.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [
    LinkPipe,
    RouterLink
  ],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailCardComponent {
  @Input() public cocktail: Cocktail;
}
