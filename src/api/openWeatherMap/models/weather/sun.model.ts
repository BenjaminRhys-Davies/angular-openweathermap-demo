export class Sun {
  rise: number;
  set: number;

  constructor (responseData: string | any) {
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData);
    }

    this.rise = responseData.sunrise;
    this.set = responseData.sunset;
  }
}

export interface ISun {
  rise: number;
  set: number;
}
