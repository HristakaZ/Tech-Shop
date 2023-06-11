import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOrderDialogComponent } from './approve-order-dialog.component';

describe('ApproveOrderDialogComponent', () => {
  let component: ApproveOrderDialogComponent;
  let fixture: ComponentFixture<ApproveOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
