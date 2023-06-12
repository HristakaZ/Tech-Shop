import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReturnDialogComponent } from './approve-return-dialog.component';

describe('ApproveReturnDialogComponent', () => {
  let component: ApproveReturnDialogComponent;
  let fixture: ComponentFixture<ApproveReturnDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveReturnDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveReturnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
