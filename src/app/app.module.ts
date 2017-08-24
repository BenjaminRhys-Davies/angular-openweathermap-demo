import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { OpenWeatherMapApiClientService } from '../api/openWeatherMap/index';

import { HttpWrapperService } from './core/services/http-wrapper/http-wrapper.service';
import { AuthService } from './core/services/auth/auth.service';

import { AppComponent } from './core/components/app/app.component';

import { CityListComponent } from './weather/components/city-list/city-list.component';

import { ForecastService } from './weather/services/forecast/forecast.service';
import { ForecastComponent } from './weather/components/forecast/forecast.component';
import { ForecastListComponent } from './weather/components/forecast-list/forecast-list.component';

import { WeatherService } from './weather/services/weather/weather.service';
import { CityComponent } from './weather/components/city/city.component';
import { WeatherComponent } from './weather/components/weather/weather.component';

import { appRoutes } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [
    OpenWeatherMapApiClientService,
    HttpWrapperService,
    AuthService,
    ForecastService,
    WeatherService,
  ],
  declarations: [
    AppComponent,
    CityListComponent,
    CityComponent,
    WeatherComponent,
    ForecastListComponent,
    ForecastComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
