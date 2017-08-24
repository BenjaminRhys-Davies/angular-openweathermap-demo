import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('@component: App', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach((done) => {
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.app'))
      .toBeTruthy();
  });

  describe('has properties', () => {
    it('author', () => {
      expect(component.author)
        .toEqual('benjamin');
    });
  });

  describe('displays a', () => {

    describe('heading', () => {
      it('exists', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.app__heading'))
          .toBeTruthy();
      });

      it('can be clicked', () => {
        fixture.debugElement.nativeElement.querySelector('.app__heading').click();

        expect(TestBed.get(Router).navigate)
          .toHaveBeenCalledWith(['/']);
      });
    });

    it('footer', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.app__footer'))
        .toBeTruthy();
    });
  });
});
