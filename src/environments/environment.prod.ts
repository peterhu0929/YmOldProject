/**
 * Environment variables for Production environment.
 */

export const environment = {
  production: true,
  getRateDay: -1,
  domain: 'http://ymfindev01.yangming.com/acctmvc/api',
  entityDomain: 'https://principaltest.iliscyber.yangming.com/ENTITY/api',
  entitytest: '/ENTITY/api',
  webformDomain: 'https://ymfinancial.yangming.com',
  mvcDomain: 'https://ymfinancial.yangming.com/acctmvc/',
  local: 'http://localhost:64247/api',
  cashtest: '/CASH/api',
  ymtemplatetest: '/YMTEMPLATE/api',
  itca: 'https://principal.iliscyber.yangming.com/itca/',
  ssrsURL: 'https://ssrs.yangming.com/reports/report/Financial/CASH/AG00001S',

  /**
   * App configuration object.
   * set api server path and app title.
   * This is needed when using YM NG APP Library.
   */
  appConfig: {
    apiServer: '../../api',
    title: 'App in Production Environment'
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
