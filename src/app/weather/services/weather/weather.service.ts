import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OpenWeatherMapApiClientService, ICity, IWeather, Weather } from '../../../../api/openWeatherMap/index';

import { CITIES } from '../../settings/cities';
import { MAXIMUM_NUMBER_OF_GROUP_IDS } from '../../settings/max-group-ids';

@Injectable()
export class WeatherService {
  private cache: { [id: string]: Observable<IWeather>; } = {};
  private cityIds: Array<number> = CITIES.map((city: ICity) => city.id);

  constructor (
    private weatherApi: OpenWeatherMapApiClientService,
  ) {}

  public hydrate (): Observable<Array<IWeather>> {
    return this.getGroupWeather(...this.cityIds);
  }

  /*
  public getWeather (cityId: number): Observable<IWeather> {
    if (!this.cache[`${cityId}`]) {
      this.cache[`${cityId}`] = this.weatherApi.GetWeather(cityId)
        .map(weather => new Weather(weather))
        .publishReplay(1)
        .refCount();
    }
    return this.cache[`${cityId}`];
  }
  */

  public getGroupWeather (...cityIds): Observable<Array<IWeather>> {
    return this.weatherApi.GetGroupWeather(
      Array.from(arguments).slice(0, MAXIMUM_NUMBER_OF_GROUP_IDS)
    ).map(data => data.list.map(weather => new Weather(weather)));
  }
}
