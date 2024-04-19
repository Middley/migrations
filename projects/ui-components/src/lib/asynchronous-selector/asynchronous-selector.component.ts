import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cad-asynchronous-selector',
  templateUrl: './asynchronous-selector.component.html',
  styleUrls: ['./asynchronous-selector.component.scss']
})
export class AsynchronousSelectorComponent {

  @Input() parameters: any;
  @Input() list: any[];
  @Input() disableSelector: boolean;
  @Input() label: string;

  @Output() searchItem = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();

  searchSubscription: Subscription;
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    if (!this.form) {
      this.ReactiveForm();
    }
    this.searchSubscription = this.form.controls.concept.valueChanges
      .pipe(
        debounceTime(this.parameters.waitTimeInSearchLargeQuantitySelectors),
        distinctUntilChanged()
      ) // Tiempo de espera en milisegundos
      .subscribe(value => {
        // Realiza las acciones según el tiempo transcurrido
        if (this.form.controls.concept.value.length >= this.parameters.minimumOfCharactersToSearchInSelectorConcept) {
          this.list = [];
          this.searchItem.emit(this.form.controls.concept.value);
        }
        // }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.form && changes.disableSelector) {
      const currentValue = changes.disableSelector.currentValue;
      if (currentValue == false) {
        this.form.controls.concept.enable();
      } else if (currentValue == true) {
        this.form.controls.concept.disable();
      }
    }
  }

  ReactiveForm() {
    const formControls = {
      concept: new FormControl({ value: '', disabled: this.disableSelector }, []),
    };

    this.form = this._fb.group(formControls);
  }

  // searchConceptAsync() {
  //   if (this.form.controls.concept.value.length < this.parameters.minimumOfCharactersToSearchInSelectorConcept) {
  //     this.list = [];
  //   }
  // }

  displayFn(value: any): any {
    return value.concept;
  }

  selectedConcept(event: any) {
    this.selectItem.emit(event.option.value);
    this.list = [];
  }

}
