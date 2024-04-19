import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cad-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss']
})
export class RegisterItemComponent implements OnInit  {
  form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<RegisterItemComponent>){
      this.initForm();
    }

  ngOnInit(): void {}


  initForm(): void {
    this.form = this._fb.group({
      categoryId: [0, [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      state: ['', [Validators.required]]
    })
  }

}
