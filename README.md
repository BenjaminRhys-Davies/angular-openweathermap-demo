# OpenWeatherMap Technical Demonstration

The purpose of this demonstration is to exhibit familiarity with next generation Angular frontend technologies,
programming patterns and to provide a sample of what clean and reusable code means to me.

## Project Goals

I have used the OpenWeatherMap API to create a single page Angular4 application that presents a list
of my favourite 5 European cities. ?The goal is to render each city's name, current weather,
sunrise time and sunset time for the current day.? Clicking on a city shows the atmospheric
pressure on the sea level for the next 5 days [1] at 09:00.

[1] In some instances (when filtered to 900hrs) the Api forecast results have been proved to only deliver forecasts for the next 4 days.
Reproduction steps have been documented within `gherkins\done\weather.forecast.feature gherkins 
The 'next 5 day' requirement has been discussed (on 25/7/2017), options presented, appraised and agreed that this variance is permissible
 
Disclaimer: This project has limitations and was time-bound to no more than 5 days - inhibiting the depth of many professional behaviours, including:

 * localisation, browser, user, acceptance, e2e testing
 * auto-prefix scss
 * production package
 * build-agent deployment
 * ...
 
Therefore the design reflects a personal goal to effectively demonstrate key principles, facilitate peer review and start a ongoing conversation.

## User Interface

The UI is a simple mobile-first interface (with all measurements in REMs), developed and tested within Chrome and Firefox.
The high-resolution imagary (500 x 1200px) selected will scale to fit most devices to ensure the interface supports most 'greenfield' devices, however mobile and desktop devices with a device-width of 450px+ are preferred.

# Pre-Requisits

Both the Angular-cli and this project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

# Getting started

Documentation of project features can be found within the `gherkins/` directory.
Checkout or unzip this code to your local machine.
Run `npm install` to download the dependent (Angular) libraries.
Run `npm run start` to enable the dev server to run the project locally
Browse to `https://localhost:4200/`
 
## Development server

Run `npm run start` for the dev server. Navigate to `http://localhost:4200/`.
The server will watch for any source files changes and automatically reload.

## Code scaffolding

Whilst available within the angular-cli, no scaffolding tools were used to generate file structure or code for this project.

## Running unit tests

Run `npm test` to execute the unit tests in Chrome via [Karma](https://karma-runner.github.io).

## Generating code coverage report

Run `npm run coverage` to generate a unit test coverage report, which can then be opened from the `coverage/` directory.

## Build

Run `npm run build` to build the project.
The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

This demonstration project has been built against the [OpenWeatherMap API](http://openweathermap.org) and tested on Linux, Firefox, Chrome and is currently setup for auto-updating "evergreen" browsers. Please note that not all browsers have been tested

If you have issues please:

 * ensure you have Node v6.9.0+ and vNPM 3+
 * ensure a valid OpenWeatherMap Api key within `src/app/core/services/auth/auth.service.ts`
 * see the latest [Angular browser matrix](https://angular.io/docs/ts/latest/guide/browser-support.html)
 * contact the author (me)
