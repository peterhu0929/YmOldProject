import { NgModule } from '@angular/core';

import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { IntlModule } from '@progress/kendo-angular-intl';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  imports: [
    DateInputsModule,
    GridModule,
    ExcelModule,
    DialogModule,
    ButtonsModule,
    ExcelExportModule,
    PDFExportModule,
    IntlModule,
    UploadModule
  ],
  exports: [
    DateInputsModule,
    GridModule,
    ExcelModule,
    DialogModule,
    ButtonsModule,
    ExcelExportModule,
    PDFExportModule,
    IntlModule,
    UploadModule
  ],
  declarations: []
})
export class KendoAngularModule { }
