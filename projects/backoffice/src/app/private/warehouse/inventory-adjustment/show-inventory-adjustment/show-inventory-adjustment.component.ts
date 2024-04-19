import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { GetStockAdjustmentById } from '../shared/interfaces/get-stock_adjustment-byid.interface';
import { StockAdjustmentService } from '../shared/services/stock-adjustment.service';
import { EditInventoryAdjustmentComponent } from '../edit-inventory-adjustment/edit-inventory-adjustment.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessagingService } from '@cad-core/services';
import { ConfirmationDialogComponent, DialogModel } from '@sw-ui-components';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-show-inventory-adjustment',
  templateUrl: './show-inventory-adjustment.component.html',
  styleUrls: ['./show-inventory-adjustment.component.scss']
})
export class ShowInventoryAdjustmentComponent implements OnInit {


  stockAdjustment: GetStockAdjustmentById;
  // @ViewChild('rowActionsDropdown') op!: OverlayPanel;
  deleteIcon = 'mdi-trash-can';
  confirmedIcon = 'check';
  colorConfirmButton = 'btn_confirm_success';
  colorCancelButton = 'btn_cancel';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _stockAdjustmentService: StockAdjustmentService,
    private _dialogService: DialogService,
    private _msgService: MessagingService,
    private _showInventoryAdjustmentModal: MatDialogRef<ShowInventoryAdjustmentComponent>,
  ) { }

  ngOnInit(): void {
    this.readData();
  }

  readData() {
    this._stockAdjustmentService.getById(this.data.Id).subscribe(response => {
      this.stockAdjustment = response.data;
    });
  }

  openEdit() {
    const dialogRef = this.dialog.open(EditInventoryAdjustmentComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.readData();
    });
  }

  confirmedAdjustment() {

    const ref = this._dialogService.open(ConfirmationDialogComponent, {
      header: this._msgService.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.DATA.CONFIRM_ADJUSTMENT'),
      data: new DialogModel(
        this._msgService.getTranslation('GENERAL.BUTTONS.CANCEL'),
        this._msgService.getTranslation('GENERAL.BUTTONS.CONFIRM'),
        this._msgService.getTranslation('WAREHOUSE.INVENTORY_ADJUSTMENT.MESSAGE.CONFIRM_ADJUSTMENT'),
        this.deleteIcon,
        '',
        '',
        '',
        this.colorConfirmButton,
        this.colorCancelButton
      ),
    });
    ref.onClose.subscribe((confirm: boolean) => {
      if (confirm) {
        this._stockAdjustmentService.ConfirmStockAdjustment(this.stockAdjustment.id).subscribe(response => {
          this._showInventoryAdjustmentModal.close()
        });
      }
    });
  }
}
