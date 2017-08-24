import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Flag'
})
export class FlagPipe implements PipeTransform {
  private countryFlagUri = 'http://openweathermap.org/images/flags/{{{countryCode}}}.png';

  public transform (countryCode: string): Array<string> {
    if (!countryCode) {
      return [ '' ];
    }
    return [ this.countryFlagUri.replace(/{{{countryCode}}}/, countryCode.toLowerCase()) ];
  }
}
