import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import {inject} from "@angular/core";
import {UserStore} from "../store/user.store";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs";

export const apiInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const userStore = inject(UserStore)
  const bearer = userStore.getToken();

  const protocol = new URL(request.url).protocol;
  const domain = new URL(request.url).host;
  const apiDomain = `${protocol}//${domain}`

  const tokenReq = request.clone({
    setHeaders: {
      bearer
    }
  });

  return next((bearer && apiDomain === environment.apiUrl) ? tokenReq: request).pipe(
    catchError((e) => {
      if (bearer && e.status === 401) {
        userStore.logOut();
      }
      throw e
    })
  );
};

