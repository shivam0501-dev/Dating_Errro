import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _accountservoces:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._accountservoces.currentUser$.pipe(take(1)).subscribe({
      next:User=>{
        if(User){
          request=request.clone({
            setHeaders:{
              Authorization:'Bearer '+User.token
            }
          })
        }
      }
    })
    return next.handle(request);
  }
}
