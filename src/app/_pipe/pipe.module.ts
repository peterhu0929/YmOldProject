import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe-pipe.pipe';
import { LocalizationPipe } from './Localization.pipe';
import { Code2NamePipe } from './code2Name.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SafePipe,
    LocalizationPipe,
    Code2NamePipe
  ],
  declarations: [
    SafePipe,
    LocalizationPipe,
    Code2NamePipe
  ],
})
export class PipeModule {
}
