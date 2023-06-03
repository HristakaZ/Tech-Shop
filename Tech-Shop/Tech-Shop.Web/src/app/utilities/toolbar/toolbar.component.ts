import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, DoCheck {
  readonly title: string = "Tech Shop";
  userRole!: string;
  decodedToken: any;
  email!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.decodedToken = this.decodeToken();
    this.setUserRole();
    this.setEmail();
  }

  ngDoCheck(): void {
    this.decodedToken = this.decodeToken();
    this.setUserRole();
    this.setEmail();
  }

  decodeToken(): any {
    if(localStorage.getItem('token')) {
      return jwt_decode(localStorage.getItem('token')!);
    }
  }

  setUserRole(): void {
    if (localStorage.getItem('token')) {
      this.userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    else {
      this.userRole = "";
    }
  }

  setEmail(): void {
    if (localStorage.getItem('token')) {
      this.email = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    else {
      this.email = "";
    }
  }

}
