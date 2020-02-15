import { NgModule } from '@angular/core';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {
  AutoCompleteModule,
  DropDownListModule
} from '@progress/kendo-angular-dropdowns';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { SparklineModule } from '@progress/kendo-angular-charts';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule } from '@progress/kendo-angular-upload';

@NgModule({
  imports: [
    DateInputsModule,
    GridModule,
    ExcelModule,
    DialogModule,
    ButtonsModule,
    AutoCompleteModule,
    DropDownListModule,
    ExcelExportModule,
    PDFExportModule,
    IntlModule,
    ChartsModule,
    SparklineModule,
    InputsModule,
    UploadModule
  ],
  exports: [
    DateInputsModule,
    GridModule,
    ExcelModule,
    DialogModule,
    ButtonsModule,
    AutoCompleteModule,
    DropDownListModule,
    ExcelExportModule,
    PDFExportModule,
    IntlModule,
    ChartsModule,
    SparklineModule,
    InputsModule
  ],
  declarations: []
})
export class KendoAngularModule {}
