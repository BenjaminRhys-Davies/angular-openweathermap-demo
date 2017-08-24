import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() hasForecast: boolean;
  @Input() hasWeather: boolean;
  @Input() isActive: boolean;
  @Input() countryCode: string;

  @Output() selected: EventEmitter<number> = new EventEmitter();

  constructor () {}

  public activate (id: number): void {
     this.selected.emit(id);
  }
}
