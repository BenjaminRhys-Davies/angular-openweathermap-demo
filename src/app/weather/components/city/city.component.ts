import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  private countryFlagUri = 'http://openweathermap.org/images/flags/{{{countryCode}}}.png';
  private currentId: number;
  private countryCode: string;

  public flag: string;

  @Input() id: number;
  @Input() name: string;
  @Input() hasForecast: boolean;
  @Input() hasWeather: boolean;

  @Input()
  get country (): string {
    return this.countryCode;
  }
  set country (countryCode: string) {
    this.countryCode = countryCode;
    this.flag = countryCode ?
      this.countryFlagUri.replace(/{{{countryCode}}}/, countryCode.toLowerCase()) :
      undefined;
  }

  constructor (
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit () {
    this.route.params.subscribe(params => {
      this.currentId = params['id'] ? parseInt(params['id'], 10) : undefined;
    });
  }

  public navigateToForecast (id: number): void {
    const params = this.isCurrentId(id) ? ['/'] : ['/forecast', id];
    this.router.navigate(params);
  }

  public isCurrentId (id: number): boolean {
    return id === this.currentId;
  }
}
