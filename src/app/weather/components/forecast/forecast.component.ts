import { Component, Input } from '@angular/core';

import { FILTER_FORECAST_TO_HOUR } from '../../settings/forecast-filter';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  public pressureInteger: string;
  public pressureDecimal: string;
  public forecastHour: number = FILTER_FORECAST_TO_HOUR;
  public readingDate: Date;

  @Input()
  set datetime (datetime: string) {
    this.readingDate = new Date(datetime);
  }

  @Input()
  set pressure (pressure: number) {
    const [pressureInteger, pressureDecimal]: Array<string> = (pressure + '').split('.');
    this.pressureInteger = pressureInteger;
    this.pressureDecimal = pressureDecimal;
  }

  constructor () {}
}

