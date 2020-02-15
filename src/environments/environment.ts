/**
 * Environment variables for Local environment with JSON-Server.
 */

export const environment = {
  production: false,
  local: 'http://localhost:50679/api',
  getRateDay: -31,
  // entityDomain: 'https://principaltest.iliscyber.yangming.com/ENTITY/api',
  webformDomain: 'https://ymfindev01.yangming.com',
  mvcDomain: 'https://ymfindev01.yangming.com/acctmvc/',
  cashtest: 'https://principaltest.iliscyber.yangming.com/CASH/api',
  webartest: 'https://principaltest.iliscyber.yangming.com/WEBAR/api',
  ddtest: 'https://principaltest.iliscyber.yangming.com/DD/api',
  ymtemplatetest: 'https://principaltest.iliscyber.yangming.com/YMTEMPLATE/api',
  server: 'https://principaltest.iliscyber.yangming.com/itca',
  itca: 'https://principaltest.iliscyber.yangming.com/itca/',
  entityDomain: 'https://principaltest.iliscyber.yangming.com/ENTITY/api',
  entitytest: 'https://principaltest.iliscyber.yangming.com/ENTITY/api',
  ssrsURL: 'https://ssrstest.yangming.com/reports/report/Financial/CASH/AG00001S',
  /**
   * App configuration object.
   * set api server path and app title.
   * This is needed when using YM NG APP Library.
   */
  appConfig: {
    apiServer: 'https://principaltest.iliscyber.yangming.com/itca/api',
    title: 'Local Host with JSON server'
  },

  /**
   * User idle configuration object.
   * set idle, timeout and ping for refreshing client token
   * This is needed when using YM NG APP Library.
   * You should not touch this setting in
   * TEST and/or Production environment
   */
  UserIdleConfig: {
    idle: 7200,
    timeout: 302,
    ping: 3600
  },

  /**
    * Service worker configuration object.
    * Enabling or disabling service worker / periodic update checking,
    * and set check update interval in 'hours'
    * This is needed when using YM NG APP Library.
    * You should not touch this setting in
    * TEST and/or Production environment
    */
  SWConfig: {
    enabled: false,
    updateEnabled: false,
    interval: 6
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
