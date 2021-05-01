# E-APP-PWA

This [Angular](https://angular.io/) project represents the front-end of the E-APP system, an appointment allocation system with optimization for university sector.
This runnable prototype was developed in the scope of the master thesis of Stefan Brautzsch at [Technische Hochschule Brandenburg](https://www.th-brandenburg.de/).

This project includes two applications (`e-app-planner` and `e-app-client`) and a library (`libs`).

The application server E-APP-Server is also required for use.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Install

The package manager [npm](https://www.npmjs.com/) is needed for development and building.
The installation of npm is carried out together with Node.js.

1. [Download](https://nodejs.org/en/download/) and install Node.js 
2. In the shell, go to the source code directory of the `e-app-pwa` project
3. Run `npm install`

## Configuration
Three environment configurations are to be defined in each of the two applications:
* `src\environments\environment.ts` - for development server
* `src\environments\environment.prod.ts` - for production build
* `src\environments\environment.demo.ts` - for demo build

The parameters are provided with comments for documentation.

## Development server

Run the following commands for development server:
* E-APP-Planner: `ng serve --project=e-app-planner --port 4200`
* E-APP-Client: `ng serve --project=e-app-client --port 4300`

Navigate to the following addresses:
* E-APP-Planner: [http://localhost:4200/e-app-planner](http://localhost:4200/e-app-planner)
* E-APP-Client: [http://localhost:4300/e-app-client](http://localhost:4300/e-app-client)

The app is automatically reloaded in development mode when you change any of the source files.

## Build

Check the configuration before building!

The build artifacts will be stored in the `dist/` directory.

### Build for production

Run the following commands to build for production:
* E-APP-Planner: `ng build --project=e-app-planner --prod`
* E-APP-Client: `ng build --project=e-app-client --prod`

Note the required configuration of the web server to host a single-page application (see [Angular Deployment reference](https://angular.io/guide/deployment)).

### Build for demo

Run the following commands to build for demo mode:
* E-APP-Planner: `ng build --project=e-app-planner -c demo`
* E-APP-Client: `ng build --project=e-app-client -c demo`

These builds can be integrated into the E-APP-Server for demo running.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
