import { Component, inject } from '@angular/core';
import { ProductionControl } from '../production-control/production-control';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogSelect } from '../dialog-select/dialog-select';

import productionOrders from '../../assets/files/production-orders.json'
import stoptypes from '../../assets/files/stop-types.json'

import { CommonModule } from '@angular/common';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import{ProductionOrder} from '../../../../common/ProductionOrder'
import{ProductionStatus} from '../../../../common/ProductionStatus'
import { OrderColors_e, ProductionStatusColor_e, ProductionStatus_e} from '../../../../common/enums/enum';

@Component({
  selector: 'app-terminal',
  imports: [MatDialogModule, CommonModule, ProductionControl],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})
export class Terminal {
  readonly dialog: MatDialog = inject(MatDialog);

  productionOrders: ProductionOrder[] = productionOrders as ProductionOrder[];
  stopTypes: any = stoptypes
  productionOrder: ProductionOrder = new ProductionOrder();
  productionStatus: ProductionStatus = new ProductionStatus();


  OrderColors_e: typeof OrderColors_e = OrderColors_e
  ProductionStatus_e: typeof ProductionStatus_e = ProductionStatus_e;


  async setProductionOrder(): Promise<void> {
    const dialogData: object = {
      dialogTitle: 'Selecionar ordem de produção',
      optionsList: this.productionOrders
    }

    const newProductionOrder: ProductionOrder = await this.openSelectDiaLog(dialogData);
    if(!newProductionOrder) return;

    this.productionOrder = newProductionOrder;
    this.productionStatus = new ProductionStatus(ProductionStatus_e.InProduction, ProductionStatusColor_e.InProduction);
    
  }

  async setStopType(): Promise<void>{
    const dialogData: object = {
      dialogTitle: 'Selecionar motivo de parada',
      optionsList: this.stopTypes
    }
    const stopType = await this.openSelectDiaLog(dialogData)
    if(!stopType) return

    this.productionStatus = {
      color: ProductionStatusColor_e.Stop,
      status: ProductionStatus_e[stopType.value as keyof typeof ProductionStatus_e]
    }
  }

  openSelectDiaLog(dialogData: any): Promise<ProductionOrder>{
    const dialogRef: MatDialogRef<DialogSelect, any> = this.dialog.open(DialogSelect, {
      width: '950px',
      panelClass: 'custom-dialog',
      data: dialogData
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      })
    })
    

  }
}
