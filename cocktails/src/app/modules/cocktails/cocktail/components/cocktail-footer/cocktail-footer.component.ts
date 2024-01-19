import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Cocktail} from "../../../../../models/cocktail";

@Component({
  selector: 'app-cocktail-footer',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './cocktail-footer.component.html',
  styleUrl: './cocktail-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailFooterComponent {
  @Input() public cocktail: Cocktail;
  @Input() public loading: boolean;
}
