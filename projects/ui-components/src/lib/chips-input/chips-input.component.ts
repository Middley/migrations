import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, merge } from 'rxjs';
@Component({
  selector: 'cad-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent implements OnInit {
  @Input() InputLabel: string;
  @Input() InputCheckLabel: string;
  itemsControl = new FormControl([]);
  @Input() items: any[];
  // @Input() itemsTemporal: any[];
  itemsTemporal: any[];
  inputSearch: string;

  @Output() selectedItems = new EventEmitter<any[]>();
  allSelected: boolean = true;


  constructor() { }
  ngOnInit(): void {
    if (this.items) this.itemsTemporal = this.items;
    this.itemsControl.setValue(
      this.itemsTemporal.map(item => {
        return item;
      })
    );
    this.selectedItems.emit(this.itemsControl.value);
    this.itemsControl.setValue([]);

    // if (this.itemsTemporal != null) {
    //   this.test();
    // }
  }

  searchByName($event) {
    if ($event.length > 0) {
      this.itemsTemporal = [];
      if (this.itemsControl.value.length > 0) {
        this.itemsTemporal = this.items.filter(item =>
          item.name.toLowerCase().includes($event.toLowerCase())
        );

        this.itemsControl.value.forEach(element => {
          this.itemsTemporal.push(element);
        });

      } else {
        this.itemsTemporal = this.items.filter(item =>
          item.name.toLowerCase().includes($event.toLowerCase())
        );
      }


    } else {
      this.itemsTemporal = this.items;
    }
  }

  onItemRemoved(item: string) {
    const items = this.itemsControl.value as string[];
    this.removeFirst(items, item);
    this.itemsControl.setValue(items);
    this.selectedItems.emit(this.itemsControl.value);
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  OnChange($event) {
    if ($event.checked) {
      this.allSelected = true;
      this.itemsControl.setValue(
        this.itemsTemporal.map(item => {
          return item;
        })
      );
      this.selectedItems.emit(this.itemsControl.value);
      this.itemsControl.setValue([]);
    } else {
      this.allSelected = false;
      this.itemsControl.setValue([]);
      this.selectedItems.emit(this.itemsControl.value);
    }
  }
  add() {
    this.allSelected = false;
    this.selectedItems.emit(this.itemsControl.value);
  }

  // test() {
  //   if (this.itemsTemporal.length != this.items.length) {
  //     this.allSelected = false;
  //     var itemsChecked: any[] = [];
  //     this.items.map(item => {
  //       this.itemsTemporal.forEach(item2 => {
  //         if (item.id == item2.id) {
  //           itemsChecked.push(item);
  //         }
  //       });
  //     });
  //     this.itemsControl.setValue(itemsChecked);

  //     this.selectedItems.emit(this.itemsControl.value);
  //   }
  // }
}
