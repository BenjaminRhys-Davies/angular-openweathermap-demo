import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

// The following token will ultimately be removed
// Please replace with your own Api key here: http://openweathermap.org/appid
const API_TOKEN = '70266445c12623998300d4f1a8ee0be9';

@Injectable()
export class AuthService {
  constructor () {}

  public appendAuthToken (options: RequestOptions): RequestOptions {

    // Ref: http://openweathermap.org/appid
    options.params.set('APPID', API_TOKEN);

    return options;
  }
}
