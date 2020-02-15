import { Component, OnInit, Inject } from '@angular/core';
import { AG00001Service } from '../ag00001.service';
import { ProgramsService } from '../../programs.service';
import { RegularExpressionService } from '../../../_services/regular-expression.service';
import { FinDialogService } from '../../../_services/fin-dialog/fin-dialog.service';
import { DateAdapter, MatDialog, NativeDateAdapter, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FileInfo } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-ag00001-upload',
  templateUrl: './ag00001-upload.component.html'
})

export class Ag00001UploadComponent implements OnInit {
  public SEQREF;
  public formData = new FormData();
  public tempFileList = new Array<FileData>();
  public errorFileList = new Array<FileData>();
  public isError: Boolean = false;
  public isDone: Boolean = false;
  public isProgress: Boolean = false;
  public progressValue: Number = 0;
  public fileInfo: FileInfo;
  constructor(
    private ag00001Service: AG00001Service,
    private programService: ProgramsService,
    private regularExpressionService: RegularExpressionService,
    private dialogService: FinDialogService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog, // 關鍵一刻，呼叫Dialog必須放在建構子
    @Inject(MAT_DIALOG_DATA) public data: any, // 接收從主頁面來的資料
  ) { }

  ngOnInit() {
    console.log(this.data.pData);
    this.SEQREF = this.data.pData.SEQREF;
  }
  // Template 1.多檔上傳多個警告視窗
  MultipleUpload(files: FileList) {
    console.log(files);
    // 取得選擇檔案個數
    const filesCount = files.length;
    // 一次上傳一個檔案
    for (let i = 0; i < filesCount; i++) {
      // 判斷單一檔案不可超過15MB
      if (files.item(i).size < 15728640) {
        // 取得檔案
        const file = files.item(i);
        console.log(file);
        this.ag00001Service.MultipleUpload(this.SEQREF, file).subscribe(
          (response: Response) => {
            this.dialogService.OpenDialogBox('已上傳至' + response.toString());
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            this.ag00001Service.HandleError(error);
          });
      } else {
        // filesize單位轉換成MB
        const filesize = files.item(i).size / 1024 / 1024;
        this.dialogService.OpenDialogBox('The max file size is 15MB.Error at file：'
          + files.item.name + '(FileSize：' + filesize.toFixed(2) + 'MB)');
      }
    }
  }
  // Template 2.單次多檔上傳並QC副檔名
  initialize() {
    this.progressValue = 0;
    this.isError = false;
    this.isDone = false;
    this.formData = new FormData();
    this.errorFileList = [];
  }
  // 將選取檔案存至tempFileList
  onSelectedFiles(event) {
    // console.log(event);
    const files = event.target.files;
    this.tempFileList = [];
    for (let i = 0; i < files.length; i++) {
      this.tempFileList.push({ fileName: files[i].name, file: files[i], errorMsg: '' });
    }
  }
  // 刪除tempFileList的檔案
  removeFile(row) {
    const idx = this.tempFileList.findIndex(x => x.fileName === row.name);
    this.tempFileList.splice(idx, 1);
  }
  // 上傳檔案
  filesUpload(fileInfo) {
    console.log(this.tempFileList);
    if (this.tempFileList.length === 0) {
      return this.dialogService.OpenDialogBox('Please select a file to upload.');
    }

    // tempFileList的檔案 存進formData
    for (let i = 0; i < this.tempFileList.length; i++) {
      this.formData.append('key', this.tempFileList[i].file);
      // , this.SEQREF + '_' + this.tempFileList[i].fileName);
    }

    this.ag00001Service.HttpFilesUpload(this.SEQREF, this.formData).subscribe(
      (events) => {
        // console.log(events);
        if (events.type === HttpEventType.UploadProgress) {
          this.isProgress = true;
          // 計算進度
          const val = Math.round(events.loaded / events.total * 100);
          this.progressValue = val - 1;
        }
        if (events.type === HttpEventType.Response) {
          if (events.body) {
            const errorFiles = events.body;
            console.log(errorFiles);
            if (errorFiles.length > 0) {
              // 記錄上傳錯誤檔案
              this.isError = true;
              errorFiles.forEach(file => {
                const tempFile = this.tempFileList.filter(x => x.fileName === file.fileName)[0];
                tempFile.errorMsg = file.errorMsg;
                this.errorFileList.push(tempFile);
              });
              // this.errorFileList.push(errorFiles);
              // console.log(this.errorFileList);
            }
          } else {
            // Upload finish
            this.progressValue = 100;
            this.isDone = true;
          }
          this.tempFileList = [];
          this.isProgress = false;
          fileInfo.name = '';
        }
      });
  }
}
export interface FileData {
  fileName: string;
  file: string;
  errorMsg: string;
}
