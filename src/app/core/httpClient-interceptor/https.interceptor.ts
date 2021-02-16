import {
  HttpEvent,
  HttpHandler, HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.storage.get('current_token').then((token) => {
    //
    //     if (token !== null && token.length > 0) {
    //         this.storage.get('user_auth').then(res => {
    //
    //             const conncode: string = JSON.parse(res).conncode;
    //             const userid: number = JSON.parse(res).id;

    //             if (req.method == 'GET') {
    //                 req = req.clone({ params: req.params.set("token", token) });
    //                 req = req.clone({ params: req.params.set("conncode", conncode) });
    //                 req = req.clone({ params: req.params.set("userid", userid.toString()) });

    //
    //             }
    //         })
    //     }
    // });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.responseCode == 211 || event.body.responseCode == 210) {
            // localStorage.removeItem('current_token');
            // alert('Your user has signed in from a different device');
            // this.router.navigate(['/login']);
          }

          return event;
        }
      }));
  }
}
