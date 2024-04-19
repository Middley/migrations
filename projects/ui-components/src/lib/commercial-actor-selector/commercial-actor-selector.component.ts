import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MaxLengthValidator, ValidatorFn, Validators } from '@angular/forms';
import { customLengthValidator } from '../Validators/Length/LenghInput.validator';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cad-commercial-actor-selector',
  templateUrl: './commercial-actor-selector.component.html',
  styleUrls: ['./commercial-actor-selector.component.scss']
})
export class CommercialActorSelectorComponent implements OnInit {
  formActor: FormGroup;
  searchActorForm: FormGroup;
  private inputSubject = new Subject<string>();

  @Input() labelInputActor: string;
  @Input() labelInputBusinessActorRegistered: string;
  @Input() placeholderInputActor: string;
  @Input() placeholderSearchBusinessActorRegistered: string;
  @Input() lengthValidators: number[];
  @Input() errorMessage: string;
  @Input() urlCreateBusinessActor: string;
  @Input() itemsSearched: any[] = [];
  @Input() waitTimeInSearchLargeQuantitySelectors: number;
  @Input() numberOfCharactersForSearchInBusinessActorSelector: number;
  @Input() itemShow: any;
  @Input() disableClient: boolean;

  @Output() actorCommercialValidate = new EventEmitter<boolean>();
  @Output() createBusinessActor = new EventEmitter<boolean>();
  @Output() searchBusinessActorRegisteredEvent = new EventEmitter<string>();
  @Output() onSelectedItem = new EventEmitter<number>();
  showSearchActorBusiness: boolean;

  constructor(private _fb: FormBuilder) {
    this.inputSubject.pipe(debounceTime(this.waitTimeInSearchLargeQuantitySelectors)).subscribe(value => {
      this.onInputChanged(value);
    });
  }
  ngOnInit(): void {
    if (this.formActor == null) {
      this.createForm();
    }
    this.createSearchActorBusinessForm();
    this.showSearchActorBusiness = false;
    if (this.disableClient) this.formActor.controls.IdentityDocument.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.itemShow && this.itemShow != null) {
      if (this.formActor == null) {
        this.createForm();
      }
      this.formActor.controls.IdentityDocument.setValue(this.itemShow.identityDocumentNumber);
    }
  }
  private createSearchActorBusinessForm(): void {
    this.searchActorForm = this._fb.group({
      nameOrIdentityDocument: new FormControl('', [Validators.required])
    });
  }
  private createForm(): void {
    this.formActor = this._fb.group({
      IdentityDocument: new FormControl('', [Validators.required]),
    });
    this.formActor.controls.IdentityDocument.setValidators([
      customLengthValidator(this.lengthValidators)
    ]);
  }

  public searchActor(): void {
    if (this.formActor.valid) {
      this.actorCommercialValidate.emit(this.formActor.controls.IdentityDocument.value);
    }
  }
  redirectCreatBusinessActor() {
    this.createBusinessActor.emit(true);
  }
  showSearchActorBusinessInput() {
    this.showSearchActorBusiness = !this.showSearchActorBusiness;
    this.formActor.controls.IdentityDocument.setValue("");
    this.itemShow = {};
  }

  onInputChange($event): void {
    this.inputSubject.next($event.target.value);

  }

  onInputChanged(value: string): void {
    if (value.length >= this.numberOfCharactersForSearchInBusinessActorSelector) {
      this.searchBusinessActorRegisteredEvent.emit(value);
    } else {
      this.itemsSearched = [];
    }
  }
  onItemSelected($event) {
    this.showSearchActorBusiness = false;
    this.itemsSearched = [];
    this.onSelectedItem.emit($event.option.value);
  }
  refreshSelector() {
    this.formActor.controls.IdentityDocument.clearValidators();
    this.formActor.controls.IdentityDocument.updateValueAndValidity();

  }
}


