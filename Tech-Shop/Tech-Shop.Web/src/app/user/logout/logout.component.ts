import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    let productIDs = localStorage.getItem('productIDs');
    if (productIDs) {
      localStorage.removeItem('productIDs');
    }
    this.router.navigateByUrl('user/login');
  }

}
