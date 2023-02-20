import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-confirmationdelete',
  templateUrl: './confirmationdelete.component.html',
  styleUrls: ['./confirmationdelete.component.scss']
})
export class ConfirmationdeleteComponent implements OnInit {
  constructor(public dialog: MatDialog,

              public dialogRef: MatDialogRef<ConfirmationdeleteComponent>) {}
  ngOnInit(): void {

  }

}



