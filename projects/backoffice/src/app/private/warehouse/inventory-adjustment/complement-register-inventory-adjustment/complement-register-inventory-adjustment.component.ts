import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterInventoryAdjustmentComponent } from '../register-inventory-adjustment/register-inventory-adjustment.component';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'cad-complement-register-inventory-adjustment',
  templateUrl: './complement-register-inventory-adjustment.component.html',
  styleUrls: ['./complement-register-inventory-adjustment.component.scss'],
  providers: [DatePipe],
})
export class ComplementRegisterInventoryAdjustmentComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _translate: TranslateService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private registerInventoryAdjustmentModal: MatDialogRef<RegisterInventoryAdjustmentComponent>,
    private modalService: ModalService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
  }

  reactiveForm() {
    const formControls = {
      indexFormArray: new FormControl(this.data.index, [Validators.required]),
      conceptId: new FormControl(this.data.concept.conceptId, [Validators.required]),
      conceptName: new FormControl(this.data.concept.conceptName, [Validators.required]),
      stockSystem: new FormControl(this.data.concept.stockSystem, [Validators.required]),
      stockCurrent: new FormControl(this.data.concept.stockCurrent, [Validators.required]),
      adjustment: new FormControl(this.data.concept.adjustment, [Validators.required]),
      inventoryAdjustmentDetail: this._fb.array([]),
    };

    this.form = this._fb.group(formControls);

    if (this.data.concept.inventoryAdjustmentDetailTemporal.length > 0) {

      this.data.concept.inventoryAdjustmentDetailTemporal.forEach(concept => {
        this.inventoryAdjustmentDetail.push(
          this._fb.group({
            stockCurrent: new FormControl(concept.stockCurrent, [Validators.required]),
            observation: new FormControl(concept.observation, []),
            checked: new FormControl(concept.checked, [])
          })
        );
      });

    } else if (this.data.concept.stockCurrent && this.data.concept.inventoryAdjustmentDetailTemporal.length == 0) {
      this.inventoryAdjustmentDetail.push(
        this._fb.group({
          stockCurrent: new FormControl({ value: this.data.concept.stockCurrent, disabled: true }, [Validators.required]),
          observation: new FormControl({ value: this.data.concept.observation, disabled: true }, []),
          checked: new FormControl({ value: true, disabled: true }, [])
        })
      );

      this.addConceptTable();
    } else {
      this.addConceptTable();
    }


  }

  get inventoryAdjustmentDetail() {
    return this.form.get('inventoryAdjustmentDetail') as FormArray;
  }

  removeDataConcept(i) {
    this.inventoryAdjustmentDetail.removeAt(i);
  }

  addConceptTable() {
    this.inventoryAdjustmentDetail.push(
      this._fb.group({
        stockCurrent: new FormControl('', [Validators.required]),
        observation: new FormControl('', []),
        checked: new FormControl(false, [])
      })
    );
  }

  save() {
    this.inventoryAdjustmentDetail.enable();

    if (this.form.valid) {
      this.modalService.setModalData(this.form);
    }
  }

  calcCurrentStock() {
    var totalCurrentStock = 0;
    for (let i = 0; i < this.inventoryAdjustmentDetail.length; i++) {
      if (this.inventoryAdjustmentDetail.controls[i].value.stockCurrent) {
        totalCurrentStock = totalCurrentStock + this.inventoryAdjustmentDetail.controls[i].value.stockCurrent;
      }
    }
    this.form.controls.stockCurrent.setValue(totalCurrentStock);

    this.form.controls.adjustment.setValue(totalCurrentStock - this.form.controls.stockSystem.value);
  }

  checked(i) {


    if (this.inventoryAdjustmentDetail.controls[i].value.checked == false) {
      this.inventoryAdjustmentDetail.removeAt(i);
      this.calcCurrentStock();
    } else if (this.inventoryAdjustmentDetail.controls[i].value.checked == true) {
      this.addConceptTable();
    }
  }
}
