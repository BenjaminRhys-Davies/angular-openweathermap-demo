import { Observable } from 'rxjs/Rx';

import { WeatherService } from './weather.service';

import { MAXIMUM_NUMBER_OF_GROUP_IDS } from '../../settings/max-group-ids';

describe('@service: Weather', () => {
  const mockWeatherApi = jasmine.createSpyObj('OpenWeatherMapApiClientService', ['GetGroupWeather']);
  let weatherService: WeatherService;

  beforeEach(() => {
    mockWeatherApi.GetGroupWeather.and.returnValue(Observable.of([]));
    weatherService = new WeatherService(mockWeatherApi);
  });

  it('is not hydrated', () => {
    expect(mockWeatherApi.GetGroupWeather)
      .not.toHaveBeenCalled();
  });

  describe('hydrate ()', () => {
    beforeEach(() => {
      weatherService.hydrate();
    });

    it('calls GetGroupWeather', () => {
      expect(mockWeatherApi.GetGroupWeather)
        .toHaveBeenCalled();
    });
  });

  describe('getForecast ()', () => {
    const moreThanMaxIds = Array.apply(null, Array(MAXIMUM_NUMBER_OF_GROUP_IDS + 10))
      .map(() => Math.floor(Math.random() * 200));

    beforeEach(() => {
      weatherService.getGroupWeather(...moreThanMaxIds);
    });

    it('calls GetGroupWeather', () => {
      expect(mockWeatherApi.GetGroupWeather)
        .toHaveBeenCalledWith(moreThanMaxIds.slice(0, MAXIMUM_NUMBER_OF_GROUP_IDS));
    });
  });
});
