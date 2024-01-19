import { Route } from '@angular/router';
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";

export default [
  {
    path: '',
    component: AuthComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent,
        data: {isLogin: true}
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {isLogin: false}
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  },
] satisfies Route[];
