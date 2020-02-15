/**
 * Environment variables for Test environment.
 */

export const environment = {
  production: false,
  getRateDay: -31,
  domain: 'http://ymfindev01.yangming.com/acctmvc/api',
  webformDomain: 'https://ymfindev01.yangming.com',
  mvcDomain: 'https://ymfindev01.yangming.com/acctmvc/',
  entityDomain: '/ENTITY/api',
  entitytest: '/ENTITY/api',
  cashtest: '/CASH/api',
  webartest: '/WEBAR/api',
  ddtest: '/DD/api',
  ymtemplatetest: '/YMTEMPLATE/api',
  itca: 'https://principaltest.iliscyber.yangming.com/itca/',
  ssrsURL: 'https://ssrstest.yangming.com/reports/report/Financial/CASH/AG00001S',
  /**
   * App configuration object.
   * set api server path and app title.
   * This is needed when using YM NG APP Library.
   */
  appConfig: {
    apiServer: '../../api',
    title: 'App in Test Environment'
  },

  /**
   * User idle configuration object.
   * set idle, timeout and ping for refreshing client token
   * This is needed when using YM NG APP Library.
   * You should not touch this setting in
   * TEST and/or Production environment
   */
  UserIdleConfig: {
    idle: 1800,
    timeout: 92,
    ping: 900
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
