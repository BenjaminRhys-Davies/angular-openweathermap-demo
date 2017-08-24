import { URLSearchParams, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';

describe('@service: Auth', () => {
  let authService: AuthService;
  const expectedApiToken = '70266445c12623998300d4f1a8ee0be9';

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('appendAuthToken ()', () => {
    it('sets the APPID query parameter', () => {
      const options = new RequestOptions({
        params: new URLSearchParams(),
      });
      const optionsWithAuthToken = authService.appendAuthToken(options);

      expect(optionsWithAuthToken.params.get('APPID')).toEqual(expectedApiToken);
    });
  });
});
