import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link',
  standalone: true,
})
export class LinkPipe implements PipeTransform {
  public transform(value: string): string {
    const item = value.replace(/\s+/g, '%20');
    return `https://www.thecocktaildb.com/images/ingredients/${item}-Small.png`;
  }
}
