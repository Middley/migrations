import { ChangeDetectorRef, Component, OnInit  } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { IMenu } from '@cad-private/shared/models/imenu';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cad-sidebar-private',
  templateUrl: './sidebar-private.component.html',
  styleUrls: ['./sidebar-private.component.scss']
})
export class SidebarPrivateComponent implements OnInit {
  menuList!: Observable<IMenu[]>;
  mobileQuery: MediaQueryList;

  userRoles: string[] = [];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private httpService: HttpClient,
  ) 
  {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change",this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
    this.menuList = this.httpService.get<IMenu[]>('assets/data/navigation-titles.data.json');
  }

  hasPermission(menu: IMenu): boolean {
    /*     if (menu.text == 'Cuenta') {
      if (this.username != 'null' && !this.firstLogin) {
        return true;
      } else return false;
    } */

    if (menu.roles) {
      return menu.roles.some(r => this.userRoles.includes(r));
    } else {
      return true;
    }
  }
}
