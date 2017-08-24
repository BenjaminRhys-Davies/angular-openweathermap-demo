import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpWrapperService {

  constructor(
    public auth: AuthService,
    public http: Http,
  ) {}

  public request (url: string, options: RequestOptions): Observable<Response> {

    // Ref: http://openweathermap.org/appid
    options = this.auth.appendAuthToken(options);

    // Ref: http://openweathermap.org/forecast5#data
    options.params.set('units', 'metric');

    // Ref: http://openweathermap.org/forecast5#multi
    options.params.set('lang', 'en');

    return this.http.request(url, options)
      .catch(error => Observable.throw(error));
  }
}
