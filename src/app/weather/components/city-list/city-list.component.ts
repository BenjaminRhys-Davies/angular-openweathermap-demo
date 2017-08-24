import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { ICity, IWeather, IForecast } from '../../../../api/openWeatherMap/index';
import { ForecastService } from '../../services/forecast/forecast.service';
import { WeatherService } from '../../services/weather/weather.service';

import { CITIES } from '../../settings/cities';

interface ICityWeatherReport extends ICity {
  weather?: IWeather;
  forecasts?: Array<IForecast>;
}

@Component({
  selector: 'app-citylist',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  private cityWeatherReports: Array<ICityWeatherReport> = CITIES;

  constructor (
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private forecastService: ForecastService,
  ) {}

  ngOnInit () {
    this.weatherService.hydrate().subscribe(
      (weathers: Array<IWeather>) => {
        weathers.map((weather: IWeather) => {
          _.find(this.cityWeatherReports, ['id', weather.id]).weather = weather;
        });
      }
    );

    this.route.params.subscribe(params => {
      const id: number = parseInt(params['id'], 10);

      this.cityWeatherReports.map((city: ICityWeatherReport) => {
        delete city.forecasts;
      });

      if (id) {
        this.getForecast(id);
      }
    });
  }

  public get weatherReports (): Array<ICityWeatherReport> {
    return this.cityWeatherReports;
  }

  private getForecast (id: number): void {
    this.forecastService.getForecast(id).subscribe(
      (forecasts: Array<IForecast>) => {
        _.find(this.cityWeatherReports, ['id', id]).forecasts = forecasts;
      }
    );
  }
}
