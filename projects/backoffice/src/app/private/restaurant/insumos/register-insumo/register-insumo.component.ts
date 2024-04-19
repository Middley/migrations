import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { RestauratService } from '../shared/services/restaurant-service.service';
import { InsumoService } from '../shared/services/insumo-service.service';
import { CustomTitleService } from '@cad-shared/services/custom-title.service';
import { ItemsCategory } from '../shared/interfaces/itemsCategory';
import { NotificationService } from '@cad-core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { RegisterItemComponent } from '../register-item/register-item.component';
import { ConfirmDialogComponent } from '@sw-ui-components';
import { GroupInsumo, ItemGroupConcept } from '../shared/interfaces/saveInsumo';
import { DatePipe } from '@angular/common';
import { MessagingService } from '@cad-core/services';
import { ParametersConfiguration } from '../shared/interfaces/GetParameters';


@Component({
  selector: 'cad-register-insumo',
  templateUrl: './register-insumo.component.html',
  styleUrls: ['./register-insumo.component.scss'],
  providers: [DatePipe],
})
export class RegisterInsumoComponent implements OnInit, OnDestroy {
  @ViewChild('input', { static: false }) input: ElementRef;
  mostrarLoading: boolean = false;
  overlay = false;
  form: FormGroup;
  previousInputValue: string = '';
  @ViewChild('list') todoList: CdkDropList;
  IsThereInsumo: boolean = false;

  isValidForSaved: Boolean = false;
  itemGroupConcept: ItemGroupConcept[] = [];
  parameters: ParametersConfiguration;

  insumosItemRegister: any[] = [];
  insumosItemTemporal: any[];
  insumosSelected: any[] = [];

  insumosByItem: any[] = [];

  idInsumoItem: number[] = [];
  idConceptoPrincipal: number;
  idConceptoSecundario: number[] = [];
  cantidadInsumo: number[] = [];

  insumosItem: any[] = [];
  itemsCategory: any[] = [];

  conceptosNegocioItem: any[] = [];
  conceptosNegocioInsumo: any[] = [];

  serverMessage: string;
  message: string;
  messageTimer: any;

  itemCode: string;
  insumoCode: string;

  datoItemSeleccionado: string;
  datoInsumoSeleccionado: string;

  listaItemsCategories: ItemsCategory[] = [];
  listaItemsCategoriesFiltro: ItemsCategory[] = [];
  itemsCategoriaSeleccionado: ItemsCategory;
  itemCategory: ItemsCategory;

  listaInsumoItems: ItemsCategory[] = [];
  listaInsumoItemsFiltro: ItemsCategory[] = [];
  insumoItemsSeleccionado: ItemsCategory;
  insumoItem: any;

  constructor(
    private _fb: FormBuilder,
    private _serviceRestaurant: RestauratService,
    private _serviceInsumo: InsumoService,
    private customTitle: CustomTitleService,
    private _notification: NotificationService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private _msgService: MessagingService,
  ) {

    customTitle.set('Registro de Insumos');
    this.GetParameter();

  }

  ngOnInit() {

    this.GetAllItemsCategory();
    this.GetAllInsumoItems();

  }
  getFormControlName(index: number): string {
    return `cantidad_${index}`;
  }


  InitForm() {
    this.form = this._fb.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      codigo: [''],
      insumoItem: [''],
      itemCategory: [''],
    });

    this.form.get('itemCategory')?.valueChanges.subscribe(value => {
      this.listaItemsCategoriesFiltro = this.retornarItemsCategoriesPorFiltro(value);
    });

    this.form.get('insumoItem')?.valueChanges.subscribe(value => {
      this.listaInsumoItemsFiltro = this.retornarInsumoItemsPorFiltro(value);
    });
  }

  InitializeDefaultData() {
    var newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() + this.parameters.vigenciaPorDefectoGrupoConcepto);
    this.form.controls.fromDate.setValue(new Date());
    this.form.controls.toDate.setValue(newDate);

  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.previousInputValue = inputValue;
  }

  changeQuantity(index: number, value: number) {
    this.insumosItemRegister[index].cantidad = value;
    this.verifyInconsistency();
  }

  ngOnDestroy(): void {
    const currentInputValue = (document.querySelector('input') as HTMLInputElement).value;
    if (currentInputValue !== this.previousInputValue) {
      this.openConfirmDialog();
    }
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: `Se realizaron cambios para ${this.datoItemSeleccionado}`
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.insumosByItem != null) {
          this.SaveInsumo();
        } else {
          this.UpdateInsumo();
        }

      }
    });
  }

  GetParameter() {
    this._serviceInsumo.GetParametersForInsumo().subscribe(response => {
      this.parameters = response.data;
      this.InitForm();
      this.InitializeDefaultData();
    })
  }

  GetAllItemsCategory() {
    this.mostrarLoading = true;
    this._serviceRestaurant.GetCategoryByItemsCategoryOfRol().subscribe(res => {
      this.itemsCategory = res;

      if (this.itemsCategory != null) {

        this.mostrarLoading = false;

        this.itemsCategory = this.itemsCategory.map((item) => {
          item.conceptoNegocio = item.conceptoNegocio.map(concept => {
            concept.itemsecundario = false;
            this.conceptosNegocioItem.push(concept);
            return concept;
          });
          //console.log("Insumos:  ", item);
          return item;
        });

        const lista = this.conceptosNegocioItem as ItemsCategory[];
        this.listaItemsCategories = lista.filter(p => p.id > 0);

        const primerElemento = this.listaItemsCategories[0];

        this.datoItemSeleccionado = primerElemento.nombre;
        this.idConceptoPrincipal = primerElemento.id;
        this.GetInsumosByItem(this.idConceptoPrincipal);
      }
    });
  }

  GetAllInsumoItems() {
    this.mostrarLoading = true;
    this._serviceRestaurant.GetCategoryByInsumosItemOfRol().subscribe(res => {
      this.insumosItem = res.slice();
      if (this.insumosItem != null) {
        this.mostrarLoading = false;

        this.insumosItem = this.insumosItem.map((item, index) => {
          item.conceptoNegocio = item.conceptoNegocio.map(concept => {
            this.conceptosNegocioInsumo.push(concept);
            concept.indexInsumo = index;
            concept.cantidad = 0;
            concept.itemsecundario = false;
            return concept;
          });
          return item;
        });

        const lista = this.conceptosNegocioInsumo as ItemsCategory[];
        this.listaInsumoItems = lista.filter(p => p.id > 1);
      }

    });
  }

  SearchItemCategoryByCode() {
    if (!this.form.value.codigo || this.form.value.codigo.trim() === '') {
      return;
    }
    this._serviceRestaurant.GetItemCategoryByCode(this.form.value.codigo).subscribe(res => {
      this.itemCategory = res.data;
      this.itemCode = this.form.value.codigo;

      if (this.itemCategory != null) {
        this.datoItemSeleccionado = this.itemCategory.nombre;
        this.idConceptoPrincipal = this.itemCategory.id;
        this.GetInsumosByItem(this.idConceptoPrincipal);
      } else {
        this.serverMessage = res.message;
        this._notification.showWarning(this.serverMessage + ' con el codigo: ' + this.itemCode, 'WARNING');
      }
    });
  }

  SearchInsumoItemByCode() {
    if (!this.form.value.codigo || this.form.value.codigo.trim() === '') {
      return;
    }
    this._serviceRestaurant.GetInsumoItemByCode(this.form.value.codigo).subscribe(res => {
      this.insumoItem = res.data;

      this.insumoCode = this.form.value.codigo;

      if (this.insumoItem != null) {
        this.insumoItem.itemsecundario = true;
        const itemExists = this.insumosItemRegister.find(item => item.id === this.insumoItem.id);

        if (!itemExists) {
          this.insumosItemRegister.push(this.insumoItem);
          this.insumosItem = this.insumosItem.map(insumo => {
            insumo.conceptoNegocio.map(concept => {
              if (concept.id == this.insumoItem.id) {
                concept.itemsecundario = true;
              }
              return concept;
            });
            return insumo;
          });

        } else {
          this._notification.showWarning('El insumo ya existe', 'WARNING');
        }
      } else {
        this.serverMessage = res.message;
        //this.datoInsumoSeleccionado = '';
        this._notification.showWarning(this.serverMessage + ' con el codigo: ' + this.insumoCode, 'WARNING');
      }
    });
  }

  IsInsumoAlreadyExists(element: any): boolean {
    for (let i = 0; i < this.insumosItemRegister.length; i++) {
      if (this.insumosItemRegister[i] != null && this.insumosItemRegister[i].id === element.id) {
        return true;
      }
    }
    return false;
  }

  setInsumosItemRegisterToInsumo() {
    this.insumosItemRegister.forEach(insumo => {
      if (insumo.itemsecundario == false) {
        this.insumosItem[insumo.indexInsumo].conceptoNegocio.push(insumo);
      }
      else {
        insumo.itemsecundario = false;
      }
    });
  }

  GetInsumosByItem(id: number) {

    if (this.insumosItemRegister.length > 0) {
      this.setInsumosItemRegisterToInsumo();
    }

    this._serviceInsumo.GetItemsByIdInsumo(id).subscribe(resp => {
      var dataSearched = resp.data;
      this.insumosItemRegister = [];
      if (dataSearched) {
        this.IsThereInsumo = true;
        this.form.controls.fromDate.setValue(new Date(dataSearched.fromDate));
        this.form.controls.toDate.setValue(new Date(dataSearched.toDate));
        this.insumosSelected = [];
        this.insumosItem.map((resp, indexPrimary) => {
          resp.conceptoNegocio.map((contentData, indexSecundary) => {
            let index = dataSearched.listItems.findIndex(objeto => objeto.idItem == contentData.id);
            if (index != -1) {
              contentData.itemsecundario = true;
              contentData.cantidad = dataSearched.listItems[index].quantity;
              this.insumosItemRegister.push(contentData);
              this.insumosSelected.push({ indexPrimary: indexPrimary, indexSecondary: indexSecundary });
            } else {
              contentData.itemsecundario = false;
              contentData.cantidad = 0;
            }
          });
        }
        )
      } else {
        this.IsThereInsumo = false;
        this.InitializeDefaultData();

        if (this.insumosSelected) {
          this.insumosSelected.forEach(item => {
            this.insumosItem[item.indexPrimary].conceptoNegocio[item.indexSecondary].itemsecundario = false;
            // this.insumosItem[item.indexPrimary].conceptoNegocio[item.indexSecondary].cantidad = 0;
          });
          this.insumosSelected = [];
        }
        this.insumosItemRegister = [];
      }
      this.verifyInconsistency();
    });

  }

  SaveInsumo(): void {
    var currentDate = new Date();
    // currentDate.setHours(0, 0, 0);
    if (this.IsThereInsumo || this.form.controls.fromDate.value.getDate() >= currentDate.getDate()) {


      var indexItemDefault = this.itemsCategory[0].conceptoNegocio[0].id;
      this.insumosItemRegister.forEach(insumoRegistered => {
        this.itemGroupConcept.push({ idSecundaryConcept: insumoRegistered.id, quantity: insumoRegistered.cantidad });
      });

      const data: GroupInsumo = {
        idPrimaryConcept: this.idConceptoPrincipal,
        fromDate: this.datePipe.transform(this.form.controls.fromDate.value, 'YYYY-MM-dd HH:mm:ss'),
        toDate: this.datePipe.transform(this.form.controls.toDate.value, 'YYYY-MM-dd HH:mm:ss'),
        itemGroupConcept: this.itemGroupConcept
      }

      this._serviceInsumo.InsumoRegister(data).subscribe(
        resp => {
          this._notification.showSuccess('RESTAURANTE.INSUMOS.MESSAGES.ADD.SUCCESS', 'RESTAURANTE.INSUMOS.MESSAGES.ADD.SUCCESS_TITLE');
          this.setInsumosItemRegisterToInsumo();
          this.insumosItemRegister = [];
          this.idConceptoPrincipal = indexItemDefault;
          this.InitializeDefaultData();
          this.GetAllInsumoItems();
          this.GetInsumosByItem(indexItemDefault);
        }, error => {
          this._notification.showError('RESTAURANTE.INSUMOS.MESSAGES.ADD.ERROR', 'RESTAURANTE.INSUMOS.MESSAGES.ADD.ERROR_TITLE');
        }
      );

      this.itemGroupConcept = [];
    } else {
      this._notification.showError('RESTAURANTE.INSUMOS.MESSAGES.ADD.LAST_DATE', 'RESTAURANTE.INSUMOS.MESSAGES.ADD.ERROR_TITLE');
    }
  }

  verifyInconsistency() {
    var searchValuesEmpties = this.insumosItemRegister.some(ir => ir.cantidad == "0");
    if (this.form.controls.toDate.valid && this.form.controls.fromDate.valid && !searchValuesEmpties && this.insumosItemRegister.length > 0) {
      this.isValidForSaved = true;
    } else {
      this.isValidForSaved = false;
    }

  }
  UpdateInsumo(): void {

    // this.insumosItemRegister.forEach(resp => {
    //   this.idConceptoSecundario.push(resp.id);
    // });

    // this.form.patchValue({
    //   idInsumoItem: this.idInsumoItem,
    //   id_concepto_principal: this.idConceptoPrincipal,
    //   id_concepto_secundario: this.idConceptoSecundario,
    //   cantidad: this.cantidadInsumo,
    // });
    // this.idInsumoItem = this.form.controls.idInsumoItem.value;
    // this.idConceptoPrincipal = this.form.controls.id_concepto_principal.value;
    // this.idConceptoSecundario = this.form.controls.id_concepto_secundario.value;
    // //this.cantidadInsumo = this.form.controls.cantidad.value;

    // /*  if (this.idConceptoPrincipal == null || this.idConceptoSecundario.length === 0 || this.cantidadInsumo.length === 0) {
    //    this.message = 'Debe seleccionar un insumo y especificar una cantidad válida';
    //    this.messageTimer = setTimeout(() => {
    //      this.message = '';
    //    }, 4000);
    //    return;
    //  } */

    // const insumo = {
    //   idInsumoItem: this.idInsumoItem,
    //   idConceptoPrincipal: this.idConceptoPrincipal,
    //   idConceptoSecundario: this.idConceptoSecundario,
    //   cantidad: this.cantidadInsumo,
    // };

    // this._serviceInsumo.InsumoUpdate(insumo).subscribe(resp => {
    //   if (resp.succeeded) {
    //     this.idConceptoSecundario = [];
    //     this.cantidadInsumo = [];
    //     this.GetInsumosByItem(this.idConceptoPrincipal);
    //     this._notification.showInfo(resp.message, 'INFO');
    //   } else {
    //     this._notification.showError(resp.message, 'ERROR');
    //   }
    // });

  }

  DeleteInsumoById(id: number) {
    this._serviceInsumo.DeleteInsumosById(id).subscribe(resp => {
      if (resp.succeeded) {
        this._notification.showSuccess(resp.message, 'SUCCESS');
      } else {
        this._notification.showError(resp.message, 'ERROR');
      }
    });
  }

  CloseInsumo(array, index, insumo) {

    array.splice(index, 1);
    this.idConceptoSecundario = [];

    if (insumo.itemsecundario == true) {
      this.insumosItem = this.insumosItem.map(insumoItem => {
        insumoItem.conceptoNegocio.map(concept => {
          if (concept.id == insumo.id) {
            concept.itemsecundario = false;
          }
          return concept;
        });
        return insumoItem;
      });

      this.insumosByItem = this.insumosByItem.map(insumoItem => {
        insumoItem.insumos.map(concept => {

          if (concept.idInsumoItem == insumo.idInsumoItem) {
            this.DeleteInsumoById(concept.idInsumoItem)
            concept.itemsecundario = false;
          }
          return concept;

        });
        return insumoItem;
      });


    } else {
      this.insumosItem[insumo.indexInsumo].conceptoNegocio.push(insumo);
    }

    this.verifyInconsistency();
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }

  onEnter(event) {
    this.input.nativeElement.blur();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.verifyInconsistency();
  }


  /********ITEMS******/
  retornarItemsCategoriesPorFiltro(busqueda: any): ItemsCategory[] {
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase() : busqueda.nombre.toLocaleLowerCase();

    return this.listaItemsCategories.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }

  mostrarItemsCategoria(category: ItemsCategory): string {
    return category.nombre;
  }

  ItemsCategoryParaRegistroSelect(event: any) {
    this.itemsCategoriaSeleccionado = event.option.value;
    this.idConceptoPrincipal = this.itemsCategoriaSeleccionado.id;
    this.datoItemSeleccionado = this.itemsCategoriaSeleccionado.nombre;

    this.GetInsumosByItem(this.idConceptoPrincipal);


  }


  seleccionarDatoItem(nombre: string, id: number) {
    this.datoItemSeleccionado = nombre;
    this.idConceptoPrincipal = id;

    const currentInputValue = (document.querySelector('input') as HTMLInputElement).value;
    if (currentInputValue !== this.previousInputValue) {
      this.openConfirmDialog();
    } else {
      this.GetInsumosByItem(this.idConceptoPrincipal);


    }

  }

  /******INSUMOS*****/

  retornarInsumoItemsPorFiltro(busqueda: any): ItemsCategory[] {
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase() : busqueda.nombre.toLocaleLowerCase();

    return this.listaInsumoItems.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }

  mostrarInsumoItems(category: ItemsCategory): string {
    return category.nombre;
  }

  insumoItemsParaRegistroSelect(event: any) {
    this.insumoItemsSeleccionado = event.option.value;

    const itemExists = this.insumosItemRegister.find(item => item.id === this.insumoItemsSeleccionado.id);

    if (!itemExists) {
      this.insumosItemRegister.push(this.insumoItemsSeleccionado);
      this.insumosItem = this.insumosItem.map(insumo => {
        insumo.conceptoNegocio.map(concept => {
          if (concept.id == this.insumoItemsSeleccionado.id) {
            concept.itemsecundario = true;
          }
          return concept;
        });
        return insumo;
      });

    } else {
      this._notification.showWarning('El insumo ya existe', 'WARNING');
    }

  }

  seleccionarDatoInsumo(nombre: any, id: number) {
    this.datoInsumoSeleccionado = nombre;
    this.idConceptoSecundario.push(id);
  }


  openDialogRegister() {
    this.dialog
      .open(RegisterItemComponent, {
        disableClose: true,
        /* width: '400px' */
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          // this.formatGetInputs()
        }
      });
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.fromDate < d;
  };

  clearEndDate() {
    this.form.controls['toDate'].setValue('');
  }


}
