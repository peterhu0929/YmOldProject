import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * FIXME: Service worker won't register, refer to "Existing App does not get Service Worker capabilities #8779"
 * bug(service-worker): does not start/install (zone not stabilizing) #20970
 * Waiting for Angular team to release patch.
 */

// platformBrowserDynamic().bootstrapModule(AppModule); //Original code.
// FIXME: Fix from #8779, which tried to use ngzone.runoutside and applicationref workaround, but still can't make dialog work.
platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator && environment.SWConfig.enabled) {
    navigator.serviceWorker.register('./ngsw-worker.js');
  }
}).catch(err => console.log(err));
