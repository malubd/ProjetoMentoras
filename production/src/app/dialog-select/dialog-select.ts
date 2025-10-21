import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-dialog-select',
  imports: [MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './dialog-select.html',
  styleUrl: './dialog-select.scss'
})

export class DialogSelect {
  dialogTitle: string = '';
  optionsList: any = null;

  selectedOptions: any = null

  constructor(public dialogRef: MatDialogRef<DialogSelect>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.dialogTitle= data.dialogTitle;
    this.optionsList = data.optionsList;
  }
  
  closeDialog(): void {
    this.dialogRef.close(this.selectedOptions);
  }
  setSelectedOptions(option: any):void{
    this.selectedOptions= option; //this= ta dizendo que é nessa classe aqui, que são globais pra ela
    console.log(':::Selected option:', this.selectedOptions);
  }
}
