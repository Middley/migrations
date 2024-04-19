import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cad-unsuscribe-dialog',
  templateUrl: './unsuscribe-dialog.component.html',
  styleUrls: ['./unsuscribe-dialog.component.scss'],
})
export class UnsuscribeDialogComponent implements OnInit {
  @Input() TitleModal: string;
  @Input() Question: string;
  @Input() id: any;
  @Input() BtnOk: any;
  @Input() BtnCancel: any;
  @Output() Unsuscribe = new EventEmitter<any>();

  MessageError: string = 'El campo es obligatorio';
  SubTitleLabel: string = 'Observaciones';
  unsuscribeForm: FormGroup;

  constructor(private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    const ColorModal = document.getElementById('titleModal');
  }

  private createForm(): void {
    this.unsuscribeForm = this._fb.group({
      Id: new FormControl(),
      Observation: new FormControl('', [Validators.required]),
    });
  }

  Ok() {
    if (this.unsuscribeForm?.valid) {
      const object: any = {
        Id: this.id,
        Observation: this.unsuscribeForm.controls.Observation.value,
      };
      this.Unsuscribe.emit(object);
    }
  }
}
