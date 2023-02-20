import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  constructor( public dialog: MatDialogRef<ConfirmationComponent> ,
                public matDialog:MatDialog,
                private dialogRef: MatDialogRef<ConfirmationComponent>)
                            {dialogRef.disableClose = true; }
              //on a ajouter les 2 dernieres pour disable fermeture fenetre par click dehors
  ngOnInit(): void {
  }
  confirm(){
      this.matDialog.closeAll();
      //pour fermer toutes les fenteres de dialogue
  }
  close(){
      this.dialog.close();
      //pour juste fermer fenetre de confirmation : componentconfirmation
  }
}
