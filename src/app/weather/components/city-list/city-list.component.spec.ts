import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { CityListComponent } from './city-list.component';

import { Component, Input, Output } from '@angular/core';
import { ISun } from '../../../../api/openWeatherMap/index';
import { CITIES } from '../../settings/cities';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ForecastService } from '../../services/forecast/forecast.service';
import { WeatherService } from '../../services/weather/weather.service';

@Component({
  selector: 'app-city',
  template: `<div class="mockCity"
                  [class.city--isSelected]="isActive"
                  [class.mockCity--hasForcast]="hasForecast"
                  [class.mockCity--hasWeather]="hasWeather">
    <p class="mockCity__country">{{country}}</p>
    <p class="mockCity__name">{{name}}</p>
    <p class="mockCity__id">{{id}}</p>
    <ng-content></ng-content>
  </div>`,
})
export class MockCityComponent {
  @Input() country;
  @Input() name;
  @Input() id;
  @Input() hasForecast;
  @Input() hasWeather;
  @Input() isActive;
  @Output() selected;
}

@Component({
  selector: 'app-weather',
  template: `<div class="mockWeather">
    <p class="mockWeather__description">{{description}}</p>
    <p class="mockWeather__icon">{{icon}}</p>
    <p class="mockWeather__main">{{main}}</p>
    <p class="mockWeather__sunrise">{{sun?.rise}}</p>
    <p class="mockWeather__sunset">{{sun?.set}}</p>
    <p class="mockWeather__temperature">{{temperature}}</p>
  </div>`,
})
export class MockWeatherComponent {
  @Input() description;
  @Input() icon;
  @Input() main;
  @Input() sun: ISun;
  @Input() temperature;
}

@Component({
  selector: 'app-forecastlist',
  template: `<div class="mockForecastlist">
    <ol>
      <li class="mockForecastlist__item" *ngFor="let forecast of forecasts">{{forecast.datetime}}</li>
    </ol>
  </div>`,
})
export class MockForecastListComponent {
  @Input() forecasts;
}

xdescribe('@component: CityList', () => {
  const activeCityIndex = 0;
  let fixture: ComponentFixture<CityListComponent>;
  let component: CityListComponent;

  beforeEach((done) => {
    const mockActivatedRoute = { params: new BehaviorSubject({ id: CITIES[activeCityIndex].id }).asObservable() };
    const mockForecastService = jasmine.createSpyObj('ForecastService', ['getForecast']);
    const mockWeatherService = jasmine.createSpyObj('WeatherService', ['hydrate']);

    mockForecastService.getForecast.and.returnValue(Observable.of([{ id: CITIES[activeCityIndex].id }]));
    mockWeatherService.hydrate.and.returnValue(Observable.of([]));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CityListComponent,
        MockCityComponent,
        MockWeatherComponent,
        MockForecastListComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ForecastService, useValue: mockForecastService },
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CityListComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Default Cities', () => {
    it(`should be ${CITIES.length} cities`, () => {
      expect(component.weatherReports.length).toEqual(CITIES.length);
    });

    it('should not have weather', () => {
      component.weatherReports.map((city) => {
        expect(city.weather).toBeUndefined();
      });
    });

    it('should not have forecasts', () => {
      component.weatherReports.map((city) => {
        expect(city.forecasts).toBeUndefined();
      });
    });
  });

  describe('should', () => {
    beforeEach(async(() => {
      fixture.detectChanges(false);
    }));

    it('hydrate the weather service', () => {
      expect(TestBed.get(WeatherService).hydrate).toHaveBeenCalled();
    });

    describe('display', () => {
      it('list of cities', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.city-list'))
          .toBeTruthy();
      });

      it('components', () => {
        expect(fixture.debugElement.nativeElement.querySelectorAll('.mockCity').length)
          .toEqual(CITIES.length);
      });
    });

    describe('Forecasts', () => {
      it('request forecasts for a selected City', () => {
        expect(TestBed.get(ForecastService).getForecast)
          .toHaveBeenCalledWith(CITIES[activeCityIndex].id);
      });

      it('attach forecasts to a selected City', () => {
        expect(component.weatherReports[activeCityIndex].forecasts)
          .toBeTruthy();
      });
    });
  });
});
