import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';

/**
 * YM Ng App Library
*/
import {
  YmNgappLibModule,
  APP_CONFIG,
  USER_IDLE_CONFIG,
  SW_CONFIG
} from 'ym-ngapp-lib';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FinDialogModule } from './_services/fin-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { KendoAngularModule } from './kendo-angular.module';
import { HeaderModule } from '@progress/kendo-angular-grid';
import { PipeModule } from './_pipe/pipe.module';
import { Ag00001UploadComponent } from './programs/ag00001/ag00001-upload/ag00001-upload.component';
import { Ag00001AttachDetailComponent } from './programs/ag00001/ag00001-attach-detail/ag00001-attach-detail.component';
import { AG00001Component } from './programs/ag00001/ag00001component';
import { AG00001detailComponent } from './programs/ag00001/ag00001-detail/ag00001.component-detail';
import { AG00001dialogComponent } from './programs/ag00001/ag00001-dialog/ag00001.component-dialog';
import { CM09005Component } from './programs/cm09005/cm09005component';
import { CM09005detailComponent } from './programs/cm09005/cm09005-detail/cm09005.component-detail';
import { CM09005dialogComponent } from './programs/cm09005/cm09005-dialog/cm09005.component-dialog';
import { CM09005pdfComponent } from './programs/cm09005/cm09005-pdf/cm09005.component-pdf';
import { Cm31010Component } from './programs/cm31010/cm31010.component';
import { Cm31010WAddComponent } from './programs/cm31010/cm31010w-add/CM31010W.component-add';
import { Cm31010EditComponent } from './programs/cm31010/edit/edit.component';
import { Cm31070Component } from './programs/cm31070/cm31070.component';
import { Cm09020Component } from './programs/cm09020/cm09020.component';
import { CM21010Component } from './programs/cm21010/cm21010.component';
import { CM21010dialogComponent } from './programs/cm21010/cm21010-dialog/cm21010.component-dialog';
import { CashComponent } from './programs/mvc/cash.component';
import { Cm09060Component } from './programs/cm09060/cm09060.component';
import { Cm09060ExcelComponent } from './programs/cm09060/cm09060-excel/cm09060-excel.component';
import { Cm09005ExcelComponent } from './programs/cm09005/cm09005-excel/cm09005-excel.component';
import { ExchRateProductionComponent } from './programs/exch-rate-production/exch-rate-production.component';
import { SharedCommonModule } from './_shared/shared.module';
import { Ag00001PdfComponent } from './programs/ag00001/ag00001-pdf/ag00001-pdf.component';
import { Ag00001ExcelComponent } from './programs/ag00001/ag00001-excel/ag00001-excel.component';
@NgModule({
  declarations: [
    AppComponent,
    AG00001Component,
    AG00001detailComponent,
    AG00001dialogComponent,
    CM09005Component,
    CM09005detailComponent,
    CM09005dialogComponent,
    CM09005pdfComponent,
    Cm31010Component,
    Cm31010WAddComponent,
    Cm31010EditComponent,
    Cm31070Component,
    Cm09020Component,
    CM21010Component,
    CM21010dialogComponent,
    CashComponent,
    Ag00001UploadComponent,
    Ag00001AttachDetailComponent,
    Cm09060Component,
    Cm09060ExcelComponent,
    Cm09005ExcelComponent,
    ExchRateProductionComponent,
    Ag00001PdfComponent,
    Ag00001ExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.SWConfig.enabled }),
    YmNgappLibModule,
    AngularMaterialModule,
    KendoAngularModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FinDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    PipeModule,
    SharedCommonModule
  ],
  providers: [
    { provide: APP_CONFIG, useFactory: () => environment.appConfig },
    { provide: USER_IDLE_CONFIG, useFactory: () => environment.UserIdleConfig },
    { provide: SW_CONFIG, useFactory: () => environment.SWConfig }
  ],
  bootstrap: [AppComponent],
  entryComponents: [Ag00001UploadComponent, Ag00001AttachDetailComponent, Ag00001PdfComponent],
})
export class AppModule { }
