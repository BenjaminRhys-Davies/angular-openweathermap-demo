import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastListComponent } from './forecast-list.component';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast',
  template: `<div class="mockForecast">
    <p class="mockForecast__datetime">{{datetime}}</p>
    <p class="mockForecast__pressure">{{pressure}}</p>
  </div>`,
})
export class MockForecastComponent {
  @Input() datetime;
  @Input() pressure;
}

describe('@component: ForecastList', () => {
  const expectedForecasts = [
    { datetime: '2017-07-28 9:00:00', pressure: 1009.002 },
    { datetime: '2017-07-28 10:00:00', pressure: 928.9 },
  ];

  let fixture: ComponentFixture<ForecastListComponent>;
  let component: ForecastListComponent;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ForecastListComponent,
        MockForecastComponent,
      ],
      providers: [],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ForecastListComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    component.forecasts = expectedForecasts;
    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.forecast-list'))
      .toBeTruthy();
  });

  describe('displays', () => {
    it('a heading', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.forecast-list__context'))
        .toBeTruthy();
    });

    it('a list', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.forecast-list__forecast'))
        .toBeTruthy();
    });

    it('each forecast', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.forecast-list__forecast'))
        .toBeTruthy();
    });

    describe('Forecast', () => {
      it('components', () => {
        expect(fixture.debugElement.nativeElement.querySelectorAll('.mockForecast').length)
          .toEqual(expectedForecasts.length);
      });

      it('with width', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.forecast-list__forecast').style.width)
          .toEqual(`${100 / expectedForecasts.length}%`);
      });
    });
  });
});
