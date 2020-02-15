import { Pipe, PipeTransform } from '@angular/core';
export enum PipeParm {
  CompileStatus = 'CompileStatus',
  CompilePGType = 'CompilePGType',
  YN2Boolean = 'YN2Boolean',
  RemindContract = 'RemindContract'
}
@Pipe({ name: 'code2Name' })
export class Code2NamePipe implements PipeTransform {
  bol: Boolean;
  transform(code: any, exponent: string): any {
    let name: any;

    if (exponent === PipeParm.CompileStatus) {
      if (code === -100) {
        name = '編譯失敗';
      } else if (code === 900) {
        name = '編譯成功';
      } else if (code === 1000) {
        name = '已佈署';
      } else if (code === 0) {
        name = '全部';
      }
    }
    if (exponent === PipeParm.CompilePGType) {
      if (code === 'F') {
        name = '.fmb';
      } else if (code === 'R') {
        name = '.rdf';
      } else if (code === 'L') {
        name = '.pll';
      } else if (code === 'ALL') {
        name = '全部';
      }
    }
    if (exponent === PipeParm.YN2Boolean) {
      if (code === 'Y') {
        this.bol = true;
      } else if (code === 'N') {
        this.bol = false;
      }
      name = this.bol;
    }
    if (exponent === PipeParm.RemindContract) {
      if (code === 'Y') {
        name = '已提醒';
      } else if (code === 'N') {
        name = '尚未';
      }
    }
    return name;
  }
}
