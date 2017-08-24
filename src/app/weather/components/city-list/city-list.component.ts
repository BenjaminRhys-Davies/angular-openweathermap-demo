import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ActivatedRoute, Router } from '@angular/router';
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
  private activeCityId: number;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
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
      this.cityWeatherReports.map((city: ICityWeatherReport) => {
        delete city.forecasts;
      });

      if (params['id']) {
        this.activeCityId = parseInt(params['id'], 10);
        this.getForecast(this.activeCityId);
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

  private activatedCity (id: number): void {
    const params = this.isActiveCity(id) ? ['/'] : ['/forecast', id];
    this.router.navigate(params);
  }

  private isActiveCity (id: number): boolean {
    return this.activeCityId === id;
  }
}
