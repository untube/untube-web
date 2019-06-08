import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 2500,
    verticalPosition: 'top',
    horizontalPosition: 'center'

  }
  succes(msg){
    this.config['panelClass'] = ['notification','succes']
    this.snackBar.open(msg,'',this.config);

  }

  fail(msg){
    this.snackBar.open(msg,'',this.config)
  }
}
