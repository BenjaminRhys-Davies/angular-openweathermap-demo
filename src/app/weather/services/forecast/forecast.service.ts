import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OpenWeatherMapApiClientService, IForecast, Forecast } from '../../../../api/openWeatherMap/index';

import { FILTER_FORECAST_TO_HOUR } from '../../settings/forecast-filter';

@Injectable()
export class ForecastService {
  private cache: { [id: string]: Observable<Array<IForecast>>; } = {};

  constructor (
    private weatherApi: OpenWeatherMapApiClientService,
  ) {}

  public getForecast (id: number): Observable<Array<IForecast>> {
    if (!this.cache[`${id}`]) {
      this.cache[`${id}`] = this.weatherApi.GetForecast(id)
        .map(data => data.list
          .filter(this.filterForecasts.bind(this))
          .map(forecast => new Forecast(forecast))
        )
        .publishReplay(1)
        .refCount();
    }
    return this.cache[`${id}`];
  }

  private filterForecasts ({ dt_txt }: { dt_txt: string }): boolean {
    return dt_txt.split(' ')[1] === `0${FILTER_FORECAST_TO_HOUR}:00:00`.slice(-8);
  }
}
