import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {Cocktail} from "../../../../../models/cocktail";

@Component({
  selector: 'app-cocktail-side',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './cocktail-side.component.html',
  styleUrl: './cocktail-side.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailSideComponent {
  @Input() public cocktail: Cocktail;
}
