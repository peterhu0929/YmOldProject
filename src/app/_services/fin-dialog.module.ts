import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinDialogComponent } from './fin-dialog/fin-dialog.component';
import { FinDialogService } from './fin-dialog/fin-dialog.service';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    FinDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  entryComponents: [
    FinDialogComponent,
  ],
  providers: [FinDialogService]
})
export class FinDialogModule { }
