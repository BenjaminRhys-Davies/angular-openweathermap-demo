import { Component, Input } from '@angular/core';

import { IForecast } from '../../../../api/openWeatherMap/index';

@Component({
  selector: 'app-forecastlist',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent {
  @Input() forecasts: Array<IForecast> = [];

  constructor () {}
}

