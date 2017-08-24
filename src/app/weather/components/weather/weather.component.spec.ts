import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';

describe('@component: Weather', () => {
  const activeId = 987;
  const expectedWeather = {
    description: 'EXPECTED DESCRIPTION',
    main: 'EXPACTED STRAPLINE',
    sun: { rise: 1501212004, set: 1501268678 },
    temperature: 17.33333,
    icon: '01d',
  };

  let fixture: ComponentFixture<WeatherComponent>;
  let component: WeatherComponent;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [WeatherComponent],
      providers: [],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WeatherComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    component.description = expectedWeather.description;
    component.main = expectedWeather.main;
    component.sun = expectedWeather.sun;
    component.temperature = expectedWeather.temperature;
    component.icon = expectedWeather.icon;

    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.weather'))
      .toBeTruthy();
  });

  describe('has', () => {
    it('sun rise / set', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.weather__sun'))
        .toBeTruthy();
    });

    describe('overview', () => {
      it('weather icon', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.weather__overview').style.backgroundImage)
          .toContain(`http://openweathermap.org/img/w/${expectedWeather.icon}.png`);
      });

      it('temperature', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.weather__overview-temp').textContent)
          .toContain(Math.round(expectedWeather.temperature * 10) / 10);
      });

      it('strap-line', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.weather__overview-strap').textContent)
          .toEqual(expectedWeather.main);
      });
    });
  });
});
