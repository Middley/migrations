import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplementRegisterInventoryAdjustmentComponent } from '../complement-register-inventory-adjustment/complement-register-inventory-adjustment.component';
import { WareHouseService } from '@cad-private/warehouse/shared/services/warehouse.service';
import { StockAdjustmentService } from '../shared/services/stock-adjustment.service';
import { ModalService } from '../shared/services/modal.service';
import { ShowInventoryAdjustmentComponent } from '../show-inventory-adjustment/show-inventory-adjustment.component';
import { UpdateAdjustmentDetails, UpdateStockAdjustment } from '../shared/interfaces/update-stock-adjustment.interface';
import { ParameterSelectorConcept } from '@cad-private/concept/shared/models/parameter.model';
import { BusinessConceptSelectionMode } from 'projects/backoffice/src/assets/enums/SearchByCriterionEnum';
import { ConceptService } from '@cad-private/concept/shared/services/concept.service';

@Component({
  selector: 'cad-edit-inventory-adjustment',
  templateUrl: './edit-inventory-adjustment.component.html',
  styleUrls: ['./edit-inventory-adjustment.component.scss']
})
export class EditInventoryAdjustmentComponent implements OnInit {
  form!: FormGroup;
  dataInitial: any;
  listEstablishment: any = [];
  listWareHouse: any = [];
  typeWareHouses: any = [];
  parametersConcept: ParameterSelectorConcept = new ParameterSelectorConcept();
  disableSelector: boolean = true;
  modalData: any;
  isDuplicate: boolean = false;
  verifyAdjustmentDetail: boolean = false;
  listConcept: any[];

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _showInventoryAdjustmentModal: MatDialogRef<ShowInventoryAdjustmentComponent>,
    private _stockAdjustmentService: StockAdjustmentService,
    private _warehouseService: WareHouseService,
    private modalService: ModalService,
    private _conceptService: ConceptService,
  ) {
    this.GetAllEstablishmentsAndTypeWarehouses();
  }

  ngOnInit(): void {

  }


  reactiveForm() {

    this._stockAdjustmentService.GetByIdForEdit(this.data.Id).subscribe(response => {
      this.dataInitial = response.data;

      // this.parametersConcept.businessConceptSelectionMode = response.data.businessConceptSelectionMode;
      // this.parametersConcept.minimumOfCharactersToSearchInSelectorConcept = response.data.minimumOfCharactersToSearchInSelectorConcept;
      // this.parametersConcept.waitTimeInSearchLargeQuantitySelectors = response.data.waitTimeInSearchLargeQuantitySelectors;
      const formControls = {
        confirmedAdjustment: new FormControl(true, [Validators.required]),
        disabledSelector: new FormControl(false, [Validators.required]),
        id: new FormControl(response.data.id, [Validators.required]),
        typeWarehouseId: new FormControl(response.data.warehouseRoleId, [Validators.required]),
        establishmentId: new FormControl(response.data.establishmentId, [Validators.required]),
        warehouseId: new FormControl(response.data.warehouseId, [Validators.required]),
        observation: new FormControl(response.data.observation, []),
        inventoryAdjustmentDetail: this._fb.array([]),
      };

      // this.establismentId = this.dataInitial.warehouseId;

      this.form = this._fb.group(formControls);

      this.getAllWarehouseByEstablismentId();
      this.form.controls.warehouseId.setValue(response.data.warehouseId);
      this.disableSelector = false;

      this.dataInitial.stockAdjustmentByIdDetails.forEach((item, index) => {
        this.inventoryAdjustmentDetail.push(
          this._fb.group({
            id: new FormControl(item.id, []),
            conceptId: new FormControl(item.conceptId, [Validators.required]),
            conceptName: new FormControl(item.conceptName, [Validators.required]),
            stockSystem: new FormControl(item.systemStock, [Validators.required]),
            stockCurrent: new FormControl(item.currentStock, [Validators.required]),
            adjustment: new FormControl(item.adjustment, []),
            unitCost: new FormControl(item.unitCost, [Validators.required]),
            observation: new FormControl(item.note, []),
            inventoryAdjustmentDetailTemporal: this._fb.array([]),
          })
        );
        if (item.adjustment < 0) {
          const controlStockAdjustmentDetail = this.inventoryAdjustmentDetail.at(index);
          controlStockAdjustmentDetail.get('unitCost').disable();
        }

        if (item.detail.length > 1) {
          item.detail.forEach(detail => {
            this.inventoryAdjustmentDetailTemporal(index).push(
              this._fb.group({
                stockCurrent: new FormControl(detail.stockCurrent, [Validators.required]),
                observation: new FormControl(detail.observation, []),
                checked: new FormControl(detail.checked, [])
              })
            );
          })
          this.inventoryAdjustmentDetail.controls[index].get('stockCurrent').disable();
          this.inventoryAdjustmentDetail.controls[index].get('observation').disable();
        }
      })
    })


  }

  get inventoryAdjustmentDetail() {
    return this.form.get('inventoryAdjustmentDetail') as FormArray;
  }

  inventoryAdjustmentDetailTemporal(index) {
    return this.inventoryAdjustmentDetail.controls[index].get('inventoryAdjustmentDetailTemporal') as FormArray;
  }

  addConceptTable($event) {

    if (this.inventoryAdjustmentDetail.controls.length > 0) {
      this.isDuplicate = this.inventoryAdjustmentDetail.controls.some(iad => iad.value.conceptId == $event.id);
    }
    if (this.isDuplicate == false) {
      this.inventoryAdjustmentDetail.push(
        this._fb.group({
          id: new FormControl('', []),
          conceptId: new FormControl($event.id, [Validators.required]),
          conceptName: new FormControl($event.name, [Validators.required]),
          stockSystem: new FormControl($event.stock, [Validators.required]),
          stockCurrent: new FormControl('', [Validators.required]),
          unitCost: new FormControl({ value: $event.unitCost, disabled: true }, [Validators.required]),
          adjustment: new FormControl(0, []),
          observation: new FormControl('', []),
          inventoryAdjustmentDetailTemporal: this._fb.array([]),
        })
      );
    }
    if (this.inventoryAdjustmentDetail.length == 1) {
      this.verifyAdjustmentDetail = false;
    }

  }

  removeDataConcept(i) {
    this.inventoryAdjustmentDetail.removeAt(i);

    if (this.inventoryAdjustmentDetail.length == 0) {
      this.verifyAdjustmentDetail = true;
    }
  }

  addCurrentStock(i) {
    this.inventoryAdjustmentDetail.controls[i].enable();
    const dialogRef = this.dialog.open(ComplementRegisterInventoryAdjustmentComponent, {
      disableClose: true,
      data: {
        index: i,
        concept: this.inventoryAdjustmentDetail.controls[i].value
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.modalData = this.modalService.getModalData();

      if (this.modalData != undefined) {
        this.setValuesToInventoryAdjustmentDetailTemporal(this.modalData);
        this.modalService.setModalData(undefined);
      }
      if (this.inventoryAdjustmentDetail.controls[i].get('inventoryAdjustmentDetailTemporal').value.length > 1) {
        this.inventoryAdjustmentDetail.controls[i].get('stockCurrent').disable();
        this.inventoryAdjustmentDetail.controls[i].get('observation').disable();
      }
    });
  }

  changeWarehouse() {
    if (this.inventoryAdjustmentDetail) {
      this.inventoryAdjustmentDetail.clear();
    }

    this.form.controls.disabledSelector.setValue(false);
    if (this.inventoryAdjustmentDetail.length == 0) {
      this.verifyAdjustmentDetail = true;
    }
  }

  setValuesToInventoryAdjustmentDetailTemporal(dataInventoryAdjustmentDetailTemporal) {
    // this.inventoryAdjustmentDetail.clear();
    var conceptDetail = dataInventoryAdjustmentDetailTemporal.value;

    var detail = '';

    dataInventoryAdjustmentDetailTemporal.value.inventoryAdjustmentDetail.forEach(item => {
      detail = detail + item.observation + ' | ';
    })

    this.inventoryAdjustmentDetail.controls[conceptDetail.indexFormArray].patchValue({
      stockCurrent: conceptDetail.stockCurrent,
      stockSystem: conceptDetail.stockSystem,
      observation: detail,
      adjustment: conceptDetail.adjustment
    });

    const control = this.inventoryAdjustmentDetail.at(conceptDetail.indexFormArray);
    control.get('stockCurrent').disable();
    control.get('observation').disable();
    this.addDetailConcept(conceptDetail.inventoryAdjustmentDetail, conceptDetail.indexFormArray);

  }

  addDetailConcept(ConceptDetail, index) {
    this.inventoryAdjustmentDetailTemporal(index).clear();
    ConceptDetail.forEach(cd => {
      this.inventoryAdjustmentDetailTemporal(index).push(
        this._fb.group({
          stockCurrent: new FormControl(cd.stockCurrent, [Validators.required]),
          observation: new FormControl(cd.observation, []),
          checked: new FormControl(cd.checked, [])
        })
      );
    })

  }

  //Peticiones a la BD
  GetAllEstablishmentsAndTypeWarehouses() {

    this._stockAdjustmentService.GetAllEstablishmentsAndTypeWarehouses().subscribe(response => {
      this.listEstablishment = response.data.listEstablishments;
      this.typeWareHouses = response.data.listTypeWarehouses;
      this.parametersConcept.businessConceptSelectionMode = BusinessConceptSelectionMode.businessConceptSelectionModeAsync;
      this.parametersConcept.minimumOfCharactersToSearchInSelectorConcept = response.data.minimumOfCharactersToSearchInSelectorConcept;
      this.parametersConcept.waitTimeInSearchLargeQuantitySelectors = response.data.waitTimeInSearchLargeQuantitySelectors;

      this.reactiveForm();
    });
  }

  getAllWarehouseByEstablismentId() {
    this.form.controls.warehouseId.enable();

    var establishment = [this.form.controls.establishmentId.value];
    this._warehouseService.getWarehouseByEstablismentId(establishment, this.form.controls.typeWarehouseId.value).subscribe(response => {
      this.listWareHouse = response;

    });

    if (this.inventoryAdjustmentDetail) {
      this.inventoryAdjustmentDetail.clear();
    }
  }

  calcAdjustment(i) {
    this.inventoryAdjustmentDetail.controls[i].patchValue({ adjustment: this.inventoryAdjustmentDetail.controls[i].value.stockCurrent - this.inventoryAdjustmentDetail.controls[i].value.stockSystem });
  }

  changeTypeWareHouse() {
    this.form.controls.establishmentId.setValue('');
    this.form.controls.warehouseId.setValue('');
    this.form.controls.warehouseId.disable();
    this.form.controls.disabledSelector.setValue(true);
    this.inventoryAdjustmentDetail.clear();


  }

  save() {
    if (this.form.valid && this.inventoryAdjustmentDetail.valid) {
      var adjustmentDetail: UpdateAdjustmentDetails[] = [];
      this.inventoryAdjustmentDetail.enable();
      this.inventoryAdjustmentDetail.controls.forEach((itemDetail, index) => {
        var detalle = this.inventoryAdjustmentDetailTemporal(index).value;
        if (detalle.length == 0) {
          detalle.push({ stockCurrent: itemDetail.value.stockCurrent, observation: itemDetail.value.observation, checked: true });
        }

        adjustmentDetail.push({ id: itemDetail.value.id, conceptId: itemDetail.value.conceptId, stock: itemDetail.value.stockSystem, adjustment: itemDetail.value.adjustment, unitCost: itemDetail.value.unitCost, note: detalle })
      })

      this.form.controls.warehouseId.enable();

      const DATA_STOCK_ADJUSTMENT: UpdateStockAdjustment = new UpdateStockAdjustment(
        this.form.value.id,
        this.form.value.confirmedAdjustment,
        this.form.value.warehouseId,
        this.form.value.typeWarehouseId,
        this.form.value.observation,
        adjustmentDetail,
      );

      this._stockAdjustmentService.Update(DATA_STOCK_ADJUSTMENT).subscribe(response => {
        this._showInventoryAdjustmentModal.close();
      })
    }
  }

  confirmedAdjustment() {
    this.form.controls.confirmedAdjustment.setValue(true);
    this.save()
  }

  GetConceptsByName($event) {
    this._conceptService.GetAllConceptByName(this.form.controls.typeWarehouseId.value, this.form.controls.warehouseId.value, $event).subscribe(response => {
      this.listConcept = response;

    });
  }

  searchConceptByCode($event) {
    this._conceptService.GetConcepIdByBarcode($event).subscribe(response => {
      this.getConceptByConceptIdAndWarehouse(response.data);
    });
  }

  getConceptByConceptIdAndWarehouse(conceptId: number) {
    this._conceptService.GetConceptByConceptIdAndWarehouse(this.form.controls.typeWarehouseId.value, this.form.controls.warehouseId.value, conceptId).subscribe(response => {
      if (response.data) {
        this.addConceptTable(response.data);
      }
    });
  }
}
