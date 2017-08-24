import { Observable } from 'rxjs/Rx';

import { ForecastService } from './forecast.service';

import { FILTER_FORECAST_TO_HOUR } from '../../settings/forecast-filter';

describe('@service: Forecast', () => {
  const weatherApi = jasmine.createSpyObj('OpenWeatherMapApiClientService', ['GetForecast']);
  const expectedPressure = 100.001;
  const expectedForecasts = { list: [
    { dt_txt: `2017-07-28 0${FILTER_FORECAST_TO_HOUR - 1}:00:00` },
    { dt_txt: `2017-07-28 0${FILTER_FORECAST_TO_HOUR}:00:00`, main: { pressure: expectedPressure } },
    { dt_txt: `2017-07-28 0${FILTER_FORECAST_TO_HOUR}:00:00`, main: { sea_level: expectedPressure } },
    { dt_txt: `2017-07-28 0${FILTER_FORECAST_TO_HOUR}:00:00`, main: { pressure: 9999, sea_level: expectedPressure } },
    { dt_txt: `2017-07-28 ${FILTER_FORECAST_TO_HOUR + 1}:00:00` },
  ]};
  let forecastService: ForecastService;

  beforeEach(() => {
    weatherApi.GetForecast.and.returnValue(Observable.of(expectedForecasts));
    forecastService = new ForecastService(weatherApi);
  });

  afterEach(() => {
    weatherApi.GetForecast.calls.reset();
  });

  describe('getForecast ()', () => {
    const sameId = 1234;

    beforeEach(() => {
      forecastService.getForecast(sameId);
    });

    it('calls GetForecast', () => {
      expect(weatherApi.GetForecast).toHaveBeenCalledWith(sameId);
    });

    it('caches any repeat request for the same id', () => {
      weatherApi.GetForecast.calls.reset();
      forecastService.getForecast(sameId);

      expect(weatherApi.GetForecast).not.toHaveBeenCalled();
    });

    describe('Forecasts', () => {
      let filteredForecasts;

      beforeEach((done) => {
        forecastService.getForecast(1).subscribe((forecasts) => {
          filteredForecasts = forecasts;
          done();
        });
      });

      it(`filters forecasts not at ${FILTER_FORECAST_TO_HOUR}00hrs`, () => {
        expect(filteredForecasts.length).toEqual(3);
      });

      it(`filters forecasts not at ${FILTER_FORECAST_TO_HOUR}00hrs`, () => {
        filteredForecasts.map(forecast => {
          expect(forecast.pressure).toEqual(expectedPressure);
        });
      });
    });
  });
});
