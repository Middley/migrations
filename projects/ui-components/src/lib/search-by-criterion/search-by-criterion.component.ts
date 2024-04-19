import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BusinessConceptSelectionMode } from 'projects/backoffice/src/assets/enums/SearchByCriterionEnum';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ParameterSelectorConcept } from '@cad-private/concept/shared/models/parameter.model';

@Component({
  selector: 'cad-search-by-criterion',
  templateUrl: './search-by-criterion.component.html',
  styleUrls: ['./search-by-criterion.component.scss'],
})
export class SearchByCriterionComponent implements OnChanges, OnInit {
  form: FormGroup;
  // listConcept: any[];
  listConceptFiltered: any[];

  @Input() warehouseId: number;
  @Input() disableSelector: boolean;
  @Input() typeWarehouseId: number;
  @Input() listConcept: any[];
  @Input() parameters: ParameterSelectorConcept;

  @Output() searchConceptByCode = new EventEmitter<any>();
  @Output() searchConceptByNames = new EventEmitter<any>();
  @Output() selectConcept = new EventEmitter<any>();
  @Output() refreshConcept = new EventEmitter<any>();



  lastInputTime: Date;
  searchSubscription: Subscription;
  dataConcept: any;
  labelSearchConcept: string = "BUSCAR CONCEPTO";

  businessConceptSelectionModeAsync: number;
  businessConceptSelectionModeEager: number;

  constructor(private _fb: FormBuilder) {

    this.ReactiveForm();
    this.InitDefaultData();
  }

  ngOnInit() {
    this.listConceptFiltered = this.listConcept;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.form && changes.disableSelector) {
      const currentValue = changes.disableSelector.currentValue;
      if (currentValue == false) {
        this.form.controls.code.enable();
        this.form.controls.concept.enable();
      } else if (currentValue == true) {
        this.form.controls.code.disable();
        this.form.controls.concept.disable();
      }
    }
  }


  InitDefaultData() {
    this.businessConceptSelectionModeAsync = BusinessConceptSelectionMode.businessConceptSelectionModeAsync;
    this.businessConceptSelectionModeEager = BusinessConceptSelectionMode.businessConceptSelectionModeEager;
    this.listConceptFiltered = [];
    this.listConcept = [];
  }

  OpenCreateConceptWindow() {
    window.open(this.parameters.urlCreateConcept, '_blank');
  }

  ReactiveForm() {
    const formControls = {
      code: new FormControl({ value: '', disabled: this.disableSelector }, []),
      concept: new FormControl({ value: '', disabled: this.disableSelector }, []),
    };

    this.form = this._fb.group(formControls);
  }

  searchConceptByCod() {
    this.searchConceptByCode.emit(this.form.controls.code.value);
    this.form.controls.code.setValue("");
  }

  selectedConcept(event) {
    this.selectConcept.emit(event);
    this.listConcept = [];
  }

  displayFn(value: any): any {
    return value.concept;
  }

  returnIdConcept() {
    this.selectConcept.emit(this.form.controls.concept.value);
  }

  searchMatches() {
    if (this.form.controls.concept.value.length > 1) {
      if (this.listConceptFiltered.length != this.listConcept.length) {
        this.listConceptFiltered = this.listConcept;
      }
      var searchValue = this.form.controls.concept.value.toLocaleLowerCase();

      this.listConceptFiltered = this.listConceptFiltered.filter(item => item.name.toLocaleLowerCase().includes(searchValue))
    } else if (this.listConceptFiltered.length != this.listConcept.length) {
      this.listConceptFiltered = this.listConcept;
    }
  }

  refresh() {
    this.listConceptFiltered = [];
    this.form.controls.concept.setValue("");
    this.refreshConcept.emit(true);
  }

  searchConceptByName($event) {
    this.searchConceptByNames.emit($event);
  }


}
