import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getAllComprobantSelectorDTO } from '@cad-private/presale/shared/models/getAllComprobantSelectorDTO.model';

@Component({
  selector: 'cad-electronic-receipt-selector',
  templateUrl: './electronic-receipt-selector.component.html',
  styleUrls: ['./electronic-receipt-selector.component.scss'],
})
export class ElectronicReceiptSelectorComponent implements OnInit {
  formElectronicReceipt: FormGroup;
  @Output() selectedComprobantEvent = new EventEmitter<number>();
  @Input() labelElectronicReceipt: string;
  @Input() placeHolderElectronicReceipt: string;
  @Input() listComprobant: getAllComprobantSelectorDTO[];

  constructor(private _fb: FormBuilder) {
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.listComprobant && this.formElectronicReceipt != null && this.listComprobant.length > 0) {
      this.formElectronicReceipt.controls.electronicReceipt.setValue(this.listComprobant[0].typeComprobant.id);
      this.selectedComprobantEvent.emit(this.listComprobant[0].typeComprobant.id);
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.formElectronicReceipt = this._fb.group({
      electronicReceipt: new FormControl('', [Validators.required]),
    });
  }

  selectComprobant($event) {
    const selectedComprobantId = $event.option.value;
    this.selectedComprobantEvent.emit(selectedComprobantId);
  }

  getNameComprobant(comprobantId: string) {
    if (comprobantId != "") {
      return this.listComprobant.find(lc => lc.typeComprobant.id.toString() == comprobantId).typeComprobant.name;
    }
    return null;
  }
}
