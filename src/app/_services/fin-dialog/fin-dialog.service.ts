import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FinDialogComponent } from './fin-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FinDialogService {
  public dialogResult: string;
  constructor(public dialog: MatDialog) { }
  public OpenDialogBox(message: string) {
    const dialogRef = this.dialog.open(FinDialogComponent, {
      width: '600px',
      data: message
    });

    return dialogRef.afterClosed();
  }
}
