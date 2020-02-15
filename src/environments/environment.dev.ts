/**
 * Environment variables for Development environment.
 */

export const environment = {
  production: false,

  /**
   * App configuration object.
   * set api server path and app title.
   * This is needed when using YM NG APP Library.
   */
  appConfig: {
    apiServer: 'http://localhost:51670/api',
    title: 'App in Development Environment'
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
