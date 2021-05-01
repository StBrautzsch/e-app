// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// configuration for development mode
export const environment = {
  production: false,
  appVersion: require('../../../../package.json').version + '-dev',

  // activate or deactivate the demo mode
  demoMode: true,

  // URL of E-APP-Server
  apiHost: 'http://localhost:8080',

  // prefix for API URL
  apiUrl: '/api/v1/',

  // URL for E-APP-Client
  clientUrl: 'http://localhost:4300/e-app-client',

  // URL for E-APP-Planner
  plannerUrl: 'http://localhost:4200/e-app-planner',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
