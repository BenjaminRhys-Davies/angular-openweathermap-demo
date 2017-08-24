import { City, ICity } from '../../../api/openWeatherMap/index';

// _my 5 favourite european cities_
export const CITIES: Array<ICity> = [
  {
    id: 2759794,
    name: 'Amsterdam',
    country: 'NL',
    coord: {
      lon: 4.88969,
      lat: 52.374031
    }
  },
  {
    id: 2950159,
    name: 'Berlin',
    country: 'DE',
    coord: {
      lon: 13.41053,
      lat: 52.524368
    }
  },
  {
    id: 2653822,
    name: 'Cardiff',
    country: 'GB',
    coord: {
      lon: -3.18,
      lat: 51.48
    }
  },
  {
    id: 2643743,
    name: 'London',
    country: 'GB',
    coord: {
      lon: -0.12574,
      lat: 51.50853
    }
  },
  {
    id: 6455259,
    name: 'Paris',
    country: 'FR',
    coord: {
      lon: 2.35236,
      lat: 48.856461
    }
  },
].map(city => new City(city));
