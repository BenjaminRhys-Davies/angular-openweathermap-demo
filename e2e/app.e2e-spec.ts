import { Angular4OpenWeatherMapPage } from './app.po';

describe('angular4-openweathermap-demo App', () => {
  let page: Angular4WeatherDemoPage;

  beforeEach(() => {
    page = new Angular4OpenWeatherMapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('welcome to benjamin');
  });
});
