import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, } from '@angular/material/dialog';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';

@Component({
  selector: 'cad-invalidate-presale',
  templateUrl: './invalidate-presale.component.html',
  styleUrls: ['./invalidate-presale.component.scss']
})
export class InvalidatePresaleComponent {
  Title: string = "INVALIDAR PREVENTA";
  Question: string = "Está seguro de invalidar la preventa?"
  BtnOk: string = "OK"
  BtnYes: string = "SI"
  BtnNo: string = "NO"
  BtnCancel: string = "CANCELAR"

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _presale: PresaleService) {

  }

  invalidate($event) {
    // console.log($event);
    this._presale.invalidate($event).subscribe(response => {
    });
  }

}
