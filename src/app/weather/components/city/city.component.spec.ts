import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/Rx';

import { CityComponent } from './city.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

xdescribe('@component: City', () => {
  const activeId = 987;
  const expectedCity = {
    id: 123,
    name: 'Bristol',
    hasForecast: false,
    hasWeather: false,
    country: 'GB',
    isActive: false,
  };

  let fixture: ComponentFixture<CityComponent>;
  let component: CityComponent;

  beforeEach((done) => {
    const mockActivatedRoute = { params: new BehaviorSubject({ id: activeId }).asObservable() };
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CityComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CityComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    component.id = expectedCity.id;
    component.name = expectedCity.name;
    component.hasForecast = expectedCity.hasForecast;
    component.hasWeather = expectedCity.hasWeather;
    component.isActive = expectedCity.isActive;
    component.countryCode = expectedCity.country;

    spyOn(fixture.debugElement.componentInstance, 'selected');

    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.city'))
      .toBeTruthy();
  });

  describe('has a', () => {
    it('background image', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.city').style.backgroundImage)
        .toContain(`/assets/${ expectedCity.name.toLowerCase() }/index.jpg`);
    });

    it('heading', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.city__name').textContent)
        .toContain(expectedCity.name);
    });

    it('flag', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.city__flag').src)
        .toContain(`http://openweathermap.org/images/flags/${ expectedCity.country.toLowerCase() }.png`);
    });
  });

  describe('Selection', () => {
    describe('unselected city', () => {
      it('does not have selected modifier', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.city.city--isSelected'))
          .toBeFalsy();
      });

      it('navigates to forecast', () => {
        fixture.debugElement.nativeElement.querySelector('.city').click();
        expect(TestBed.get(Router).navigate).toHaveBeenCalledWith(['/forecast', expectedCity.id]);
      });
    });

    describe('selected city', () => {
      beforeEach(() => {
        component.isActive = true;
        fixture.detectChanges(false);
      });

      it('has selected modifier', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.city.city--isSelected'))
          .toBeTruthy();
      });

      it('navigates to home', () => {
        fixture.debugElement.nativeElement.querySelector('.city').click();

        expect(TestBed.get(Router).navigate).toHaveBeenCalledWith(['/']);
      });
    });

    describe('Weather', () => {
      it('city without weather does not have modifier', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.city.city--hasWeather'))
          .toBeFalsy();
      });

      it('city with forecast has modifier', () => {
        component.hasWeather = true;
        fixture.detectChanges(false);

        expect(fixture.debugElement.nativeElement.querySelector('.city.city--hasWeather'))
          .toBeTruthy();
      });
    });

    describe('Forecast', () => {
      it('city without forecast does not have modifier', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.city.city--hasForecast'))
          .toBeFalsy();
      });

      it('city with forecast has modifier', () => {
        component.hasForecast = true;
        fixture.detectChanges(false);

        expect(fixture.debugElement.nativeElement.querySelector('.city.city--hasForecast'))
          .toBeTruthy();
      });
    });
  });
});
