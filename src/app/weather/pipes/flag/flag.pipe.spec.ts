import { FlagPipe } from './flag.pipe';

describe('Pipe: Flag', function () {
  let flagPipe: FlagPipe;

  beforeEach(() => {
    flagPipe = new FlagPipe();
  });

  it('returns expected Flag URI', () => {
    const expectedCountryCode = 'NL';

    expect(flagPipe.transform(expectedCountryCode))
      .toEqual([ `http://openweathermap.org/images/flags/${expectedCountryCode.toLowerCase()}.png` ]);
  });
});
