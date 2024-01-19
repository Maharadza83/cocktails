import { Route } from '@angular/router';
import {CocktailsComponent} from "./cocktails.component";
import {HomeComponent} from "./home/home.component";
import {CocktailComponent} from "./cocktail/cocktail.component";

export default [
  {
    path: '',
    component: CocktailsComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'my-favourites',
        component: CocktailsComponent,
      },
      {
        path: 'cocktail/:id',
        component: CocktailComponent

      }
    ]
  },
] satisfies Route[];
