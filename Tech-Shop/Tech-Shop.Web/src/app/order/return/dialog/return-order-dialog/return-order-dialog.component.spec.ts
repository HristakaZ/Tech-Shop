import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrderDialogComponent } from './return-order-dialog.component';

describe('ReturnOrderDialogComponent', () => {
  let component: ReturnOrderDialogComponent;
  let fixture: ComponentFixture<ReturnOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
