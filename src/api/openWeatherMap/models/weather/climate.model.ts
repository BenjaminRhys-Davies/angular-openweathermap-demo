export class Climate {
  main: string;
  description: string;
  icon: string;

  constructor (responseData: string | any) {
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData);
    }

    this.main = responseData.main;
    this.description = responseData.description;
    this.icon = responseData.icon;
  }
}

export interface IClimate {
  main: string;
  description: string;
  icon: string;
}
