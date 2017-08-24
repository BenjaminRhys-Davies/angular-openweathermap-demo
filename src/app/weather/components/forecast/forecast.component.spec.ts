import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastComponent } from './forecast.component';

import { FILTER_FORECAST_TO_HOUR } from '../../settings/forecast-filter';

describe('@component: Forecast', () => {
  const expectedDateTime = '2017-07-26 06:00:00';
  const expectedPressure = 1234.009;

  let fixture: ComponentFixture<ForecastComponent>;
  let component: ForecastComponent;

  beforeEach((done) => {
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [],
      declarations: [ForecastComponent],
      providers: [],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ForecastComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    component.datetime = expectedDateTime;
    component.pressure = expectedPressure;
    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.forecast'))
      .toBeTruthy();
  });

  describe('has properties', () => {
    it('forecastHour', () => {
      expect(component.forecastHour).toEqual(FILTER_FORECAST_TO_HOUR);
    });
  });

  describe('displays the', () => {
    it('day', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.forecast__day').textContent)
        .toEqual('Wed');
    });

    describe('pressure', () => {
      it('value', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.forecast__pressure').textContent)
          .toContain(`${expectedPressure}`);
      });

      it('units', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.forecast__pressure').textContent)
          .toContain('hpa');
      });
    });


  });
});
