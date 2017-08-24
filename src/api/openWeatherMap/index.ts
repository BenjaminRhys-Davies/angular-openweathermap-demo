import { Injectable } from '@angular/core';
import { Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpWrapperService } from '../../app/core/services/http-wrapper/http-wrapper.service';

export { Response } from '@angular/http';
// explicit export to work around https://github.com/angular/angular-cli/issues/2034
export {
  City,
  ICity,
  Forecast,
  IForecast,
  Climate,
  IClimate,
  Sun,
  ISun,
  Weather,
  IWeather
} from './models/index';

@Injectable()
export class OpenWeatherMapApiClientService {
  private domain = 'http://api.openweathermap.org/data/2.5';

  constructor (
    public http: HttpWrapperService
  ) {}

  /**
   *
   * @ref http://openweathermap.org/current
   *
   * @method GET
   * @name GetWeather
   * @param {number} id
   *
   */
  public GetWeather (id: number): Observable<any> {
    const uri = '/weather';
    const queryParameters = new URLSearchParams();
    queryParameters.set('id', `${id}`);

    const headers = new Headers();
    const options = new RequestOptions({
      params: queryParameters,
      headers: headers,
      method: 'GET'
    });

    return this.http
      .request(this.domain + uri, options)
      .map((response: Response) => response.json());
  }

  /**
   * @ref http://openweathermap.org/current#severalid
   *
   * @method GET
   * @name GetGroupWeather
   * @param {Array<number>} ids
   *
   */
  public GetGroupWeather (ids: Array<number>): Observable<any> {
    const uri = '/group';
    const queryParameters = new URLSearchParams();
    queryParameters.set('id', ids.join(','));

    const headers = new Headers();
    const options = new RequestOptions({
      params: queryParameters,
      headers: headers,
      method: 'GET'
    });

    return this.http
      .request(this.domain + uri, options)
      .map((response: Response) => response.json());
  }

  /**
   *
   * @ref http://openweathermap.org/forecast5
   *
   * @method GET
   * @name GetForecast
   * @param {number} id
   *
   */
  public GetForecast (id: number): Observable<any> {
    const uri = '/forecast';
    const queryParameters = new URLSearchParams();
    queryParameters.set('id', `${id}`);

    const headers = new Headers();
    const options = new RequestOptions({
      params: queryParameters,
      headers: headers,
      method: 'GET'
    });

    return this.http
      .request(this.domain + uri, options)
      .map((response: Response) => response.json());
  }
}
