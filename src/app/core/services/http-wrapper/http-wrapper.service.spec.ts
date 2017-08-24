import { ResponseOptions, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpWrapperService } from './http-wrapper.service';

import { AuthService } from '../auth/auth.service';
import { Http } from '@angular/http';

describe('@service: HttpWrapper', () => {
  const mockAuthService = jasmine.createSpyObj('AuthService', ['appendAuthToken']);
  const mockHttp = jasmine.createSpyObj('Http', ['request']);
  let httpWrapperService: HttpWrapperService;

  beforeEach(() => {
    httpWrapperService = new HttpWrapperService(mockAuthService, mockHttp);
  });

  afterEach(() => {
    mockHttp.request.calls.reset();
    mockAuthService.appendAuthToken.calls.reset();
  });

  describe('request ()', () => {
    const expectedUrl = 'EXPECTED URL';
    const expectedResponseStatus = 98765;
    const expectedResponse = new Response(
      new ResponseOptions({
        status: expectedResponseStatus,
      }));

    let options: RequestOptions;
    let httpRequestCallArgs;

    beforeEach(() => {
      options = new RequestOptions({
        params: new URLSearchParams(),
      });
      mockAuthService.appendAuthToken.and.returnValue(options);

      mockHttp.request.and.returnValue(Observable.of(expectedResponse));
      httpWrapperService.request(expectedUrl, options);
      httpRequestCallArgs = mockHttp.request.calls.mostRecent().args;
    });

    it('appends the Auth Token', () => {
      expect(mockAuthService.appendAuthToken).toHaveBeenCalledWith(options);
    });

    it('calls request with Url', () => {
      expect(httpRequestCallArgs[0]).toEqual(expectedUrl);
    });

    it('sets the units', () => {
      expect(httpRequestCallArgs[1].params.get('units')).toEqual('metric');
    });

    it('sets the language', () => {
      expect(httpRequestCallArgs[1].params.get('lang')).toEqual('en');
    });

    it('can return expected response', (done) => {
      httpWrapperService.request(expectedUrl, options).subscribe(
        response => {
          expect(response.status).toEqual(expectedResponseStatus);
          done();
        },
        () => {},
      );
    });

    describe('error', () => {
      const expectedError = 'error';

      beforeEach(() => {
        mockHttp.request.and.returnValue(Observable.throw(expectedError));
      });

      it('can be caught', (done) => {
        httpWrapperService.request(expectedUrl, options).subscribe(
          () => {},
          error => {
            expect(error).toEqual(expectedError);
            done();
          },
        );
      });
    });
  });
});
