import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinkPipe} from "../../../../../pipes/link.pipe";

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, LinkPipe, LinkPipe],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientComponent {
  @Input() public ingredient: string = '';
  @Input() public measure: string = '';
}
