export class Forecast {
  pressure: number;
  datetime: string;

  constructor (responseData: string | any) {
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData);
    }

    this.pressure = responseData.main.sea_level || responseData.main.pressure;
    this.datetime = responseData.dt_txt;
  }
}

export interface IForecast {
  pressure: number;
  datetime: string;
}
