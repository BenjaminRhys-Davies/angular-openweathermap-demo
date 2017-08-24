export class City {
  id: number;
  name: string;
  country: string;

  constructor (responseData: string | any) {
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData);
    }

    this.id = responseData.id;
    this.name = responseData.name;
    this.country = responseData.country;
  }
}

export interface ICity {
  id: number;
  name: string;
  country: string;
}
