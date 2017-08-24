import { Component, Input } from '@angular/core';
import { ISun } from '../../../../api/openWeatherMap/index';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  private temp: number;
  private weatherIcon: string;

  @Input() description: string;
  @Input() main: string;
  @Input() sun: ISun;

  @Input()
  get temperature (): number {
    return this.temp;
  }
  set temperature (temp: number) {
    this.temp = Math.round( temp * 10) / 10;
  }

  @Input()
  get icon (): string {
    return this.weatherIcon;
  }
  set icon (icon: string) {
    this.weatherIcon = icon ? `http://openweathermap.org/img/w/${icon}.png` : undefined;
  }

  constructor () {}

  public isTimeInFuture (epoch: number): boolean {
    return this.getNowAsEpoch() < epoch;
  }

  public isPlural (description: string): boolean {
    return this.endsWith(description, 's');
  }

  public formatAsTime (epoch: number): string {
    const time: Date = new Date(1e3 * epoch);
    const hours: string = this.leftPadNumber(time.getHours());
    const minutes: string = this.leftPadNumber(time.getMinutes());
    return `${hours}:${minutes}`;
  }

  private endsWith (description: string, letter: string): boolean {
    return description.substr(description.length - 1).toLowerCase() === letter;
  }

  private getNowAsEpoch (): number {
    const now: Date = new Date();
    const nowInUTC: Date = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    return Math.floor(nowInUTC.getTime() / 1000);
  }

  private leftPadNumber (n: number): string {
    return `0${n}`.slice(-2);
  }
}
