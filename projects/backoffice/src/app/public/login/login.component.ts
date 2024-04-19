import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MessagingService } from '@cad-core/services/messaging.service';
import { Errors } from '@cad-core/models/errors.model';
import { ISessionState, Login, selectAuthenticating } from '@cad-core/store';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomTitleService } from '../../shared/services/custom-title.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { SignalRSmartPrintingService } from './shared/signal-rsmart-printing.service';

@Component({
  selector: 'cad-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authType: String = '';
  title: String = '';
  public invalidLogin: boolean = false;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;
  errors: Errors = { errors: {} };

  authForm: FormGroup;

  remember = false;
  private connection: HubConnection;
  isAuthenticating$: Observable<boolean>;

  showPassword = false;
  constructor(private _fb: FormBuilder, private _store: Store<ISessionState>, private _msgService: MessagingService, private customTitle: CustomTitleService, private route: ActivatedRoute,
    private router: Router) {
    customTitle.set('LOGIN');
  }

  ngOnInit(): void {
    this.isAuthenticating$ = this._store.select(selectAuthenticating);

    this.authForm = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(256), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(256)]],
    });

    this.isAuthenticating$.subscribe(isAuthenticating => {
      if (isAuthenticating) {
        this.authForm.disable();
      } else {
        this.authForm.enable();
      }
    });
    this.getToken();
  }


  get emailCtrl() {
    return this.authForm.get('email');
  }

  get passCtrl() {
    return this.authForm.get('password');
  }

  onBlur(controlName: string) {
    this.authForm.get(controlName)?.markAsDirty();
  }

  login() {
    this.mostrarLoading = true;
    if (this.authForm.valid) {
      const email = this.authForm.get('email')?.value;
      const password = this.authForm.get('password')?.value;
      this._store.dispatch(new Login({ email, password }));
    } else {
      this.authForm.get('email')?.markAsDirty();
      this.authForm.get('password')?.markAsDirty();
      this._msgService.error('LOGIN.TOAST.INFO.MESSAGE', 'LOGIN.TOAST.INFO.TITLE');
    }
  }

  getToken() {
    this.route.queryParams.subscribe(params => {
      // Accede a los parámetros de consulta aquí
      const tokenFromExternalApp = params['accessToken'];
      if (tokenFromExternalApp != null) {
        localStorage.setItem('accessToken', tokenFromExternalApp);
        this.router.navigate(['/private/home']);
      } else {
        this.router.navigate(['/public']);
      }
    });
  }
}
