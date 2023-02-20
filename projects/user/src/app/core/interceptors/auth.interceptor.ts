import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newrequest=request.clone({
     headers:request.headers.append('Authorization' ,`Bearer ${localStorage.getItem('token')}`)
    }//interceptor porte de sortie de toute request
     //on clone request et on change son contenue puis on lenvoie return
     //sous forme de nouveau request newrequest qui porte le jeton
     //donc toute request porte le jeton on lenvoie dans header
       //tous request sortant doit porter le jeton
    )
    return next.handle(newrequest);
  }
}
