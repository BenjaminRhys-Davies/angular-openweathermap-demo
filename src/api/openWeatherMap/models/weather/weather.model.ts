import { IClimate, Climate } from './climate.model';
import { ISun, Sun } from './sun.model';

export class Weather {
  id: number;
  datetime: number;
  sun: ISun;
  climate: IClimate;
  temperature: number;

  constructor (responseData: string | any) {
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData);
    }

    this.id = responseData.id;
    this.datetime = responseData.dt;
    this.sun = new Sun(responseData.sys);
    if (responseData.weather.length) {
      this.climate = new Climate(responseData.weather[0]);
    }
    if (responseData.main) {
      this.temperature = responseData.main.temp;
    }
  }
}

export interface IWeather {
  id: number;
  datetime: number;
  sun: ISun;
  climate: IClimate;
  temperature: number;
}
