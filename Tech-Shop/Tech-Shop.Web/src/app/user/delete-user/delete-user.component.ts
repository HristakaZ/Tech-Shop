import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationAuthorizationService } from '../services/authentication-authorization.service';
import { RoleConstants } from '../constants/role-constants';
import { User } from '../get-all-users/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from './dialog/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  @Input()
  id!: number;
  productID!: number;
  constructor(public deleteUserDialog: MatDialog) { }

  openDeleteUserDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.id
    };
    const dialogRef: MatDialogRef<DeleteUserDialogComponent> = this.deleteUserDialog.open(DeleteUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
