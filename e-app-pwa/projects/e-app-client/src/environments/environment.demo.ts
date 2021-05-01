// configuration for demo mode
export const environment = {
  production: true,
  appVersion: require('../../../../package.json').version,

  // activate or deactivate demo mode
  demoMode: true,

  // URL of E-APP-Server
  apiHost: 'http://localhost:48080',

  // prefix for API URL
  apiUrl: '/api/v1/',

  // URL for E-APP-Client
  clientUrl: 'http://localhost:48080/e-app-client',

  // URL for E-APP-Planner
  plannerUrl: 'http://localhost:48080/e-app-planner',
};
