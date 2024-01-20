import { Route } from '@angular/router';
import {CocktailsComponent} from "./cocktails.component";
import {HomeComponent} from "./home/home.component";
import {CocktailComponent} from "./cocktail/cocktail.component";
import {isLoggedInGuard} from "../../guards/is-logged-in.guard";
import {MyFavouritesComponent} from "./my-favourites/my-favourites.component";

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
        path: 'cocktail/:id',
        component: CocktailComponent
      },
      {
        path: 'my-favourites',
        component: MyFavouritesComponent,
        canActivate: [ isLoggedInGuard ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
] satisfies Route[];
