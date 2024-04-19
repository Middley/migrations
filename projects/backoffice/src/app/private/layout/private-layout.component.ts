import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '@cad-core/services';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import jwt_decode from 'jwt-decode';
import { IMenu } from '@cad-private/shared/models/imenu';

@Component({
  selector: 'cad-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
})
export class PrivateLayoutComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @ViewChild('headerProfileDropdown') profileDropdown: OverlayPanel;
  username: string;
  buttonActive: boolean;
  childComponenetName: string;
  menuList: Observable<IMenu[]>;
  userNameActive: boolean;
  firstLogin: boolean;

  userRoles: string[] = [];
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private httpService: HttpClient,
    private jwtService: JwtService
  ) {
    this.buttonActive = false;
  }

  ngOnInit(): void {
    const fist = this.jwtService.getFirstLogin();
    this.firstLogin = fist == 'true' ? true : false;

    this.childComponenetName = 'vehicles';
    this.menuList = this.httpService.get<IMenu[]>('assets/data/navigation-titles.data.json');
    this.username = this.jwtService.getData();
    if (this.username == 'null') {
      this.userNameActive = false;
    } else this.userNameActive = true;
    const token = this.jwtService.getToken();

    // if (token) {
    //   const decodedToken: any = jwt_decode(token);
    //   this.userRoles = decodedToken.roles;
    // }
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:1300px)']).subscribe(res => {
      if (res.matches) {
        this.sidenav.mode = 'side';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  changeTitle() {
    this.childComponenetName = this.router.url.split('/')[2];
  }

  logout(): void {
    this.profileDropdown.hide();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('data');
    localStorage.removeItem('firstLogin');
    window.location.reload();
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
