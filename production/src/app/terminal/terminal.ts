import { Component, inject } from '@angular/core';
import { ProductionControl } from '../production-control/production-control';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogSelect } from '../dialog-select/dialog-select';

import productionOrders from '../../assets/files/production-orders.json'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})
export class Terminal {

  readonly dialog: MatDialog = inject(MatDialog);

  productionOrders: any[] = productionOrders

  async setProductionOrder() {
    console.log('teste evento de clique')
    await this.openSelectDiaLog();
  }

  openSelectDiaLog(): any{
    const dialogRef: MatDialogRef<DialogSelect, any> = this.dialog.open(DialogSelect, {
      width: '950px',
      panelClass: 'custom-dialog',
      data: {dialogTitle: 'Teste dialog', optionsList: this.productionOrders}
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      })
    })
    

  }
}
