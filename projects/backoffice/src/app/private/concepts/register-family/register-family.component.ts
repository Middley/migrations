import { Component } from '@angular/core';

@Component({
  selector: 'cad-register-family',
  templateUrl: './register-family.component.html',
  styleUrls: ['./register-family.component.scss'],
})
export class RegisterFamilyComponent {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
