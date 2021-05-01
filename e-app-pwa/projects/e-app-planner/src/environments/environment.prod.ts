// configuration for production mode
export const environment = {
  production: true,
  appVersion: require('../../../../package.json').version,

  // Activate or deactivate demo mode
  demoMode: false,

  // URL of E-APP-Server
  apiHost: 'https://example.com:8080',

  // prefix for API URL
  apiUrl: '/api/v1/',

  // URL for E-APP-Client
  clientUrl: 'https://example.com/e-app-client',

  // URL for E-APP-Planner
  plannerUrl: 'https://example.com/e-app-planner',
};
